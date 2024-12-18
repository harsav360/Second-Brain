// Write MongoDB connection here

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connect = () => {
    mongoose.connect(process.env.MONGODB_URL!)
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error:any) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};


