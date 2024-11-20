import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middlewares/Middleware";
import { connect } from "./config/db";
import dotenv from "dotenv";
import User from './models/User';
import Content from './models/Content';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connect();

// Health check endpoint
app.get("/api/v1/healthCheck", (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    });
});

app.post("/api/v1/signup", async (req, res) => {
    // TODO: zod validation , hash the password
    const username = req.body.username;
    const password = req.body.password;

    try {
        await User.create({
            username: username,
            password: password
        }) 

        res.json({
            message: "User signed up"
        })
    } catch(e) {
        res.status(411).json({
            message: "User already exists"
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({
        username,
        password
    })
    if (existingUser) {
        const token = jwt.sign({
            id: existingUser._id
        }, process.env.JWT_PASSWORD!)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrrect credentials"
        })
    }
})

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    try{
        await Content.create({
            link,
            type,
            title: req.body.title,
            //@ts-ignore
            userId: req.userId,
            tags: []
        })
    
        res.json({
            message: "Content added"
        })

    } catch (error:any) {
        res.status(400).json({
            message:error.message
        })
    }
    
    
})

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await Content.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    await Content.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

app.listen(3000);