import mongoose from "mongoose";

const mongoDb = mongoose.Schema;

const linkSchema = new mongoDb({
    hash : {type:String,required:true},
    userId : {type:mongoDb.Types.ObjectId,ref:'User',required:true}
})

const Link = mongoose.model('Link',linkSchema)
module.exports = Link;