import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try{
        const header = req.headers["authorization"];
        const decoded = jwt.verify(header as string, process.env.JWT_PASSWORD!)
        if (decoded) {
            //@ts-ignore
            req.userId = decoded.id;
            next()
        } else {
            res.status(403).json({
                message: "You are not logged in"
            })
        }
    }
   
    catch (error){
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({
                message: "Invalid JWT Token"
            })
          } else {
            res.status(500).json({
                message: "Internal Server error occured, Please try after some time."
            })
          }

    }
}

// override the types of the express request object