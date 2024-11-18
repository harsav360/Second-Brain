import mongoose,{Model,Document,Schema} from "mongoose";

interface ILink extends Document {
    hash : String,
    userId:mongoose.Types.ObjectId
}

const linkSchema : Schema<ILink> = new Schema({
    hash : {type:String,required:true},
    userId : {type:mongoose.Types.ObjectId,ref:'User',required:true}
})

const Link: Model<ILink> = mongoose.model<ILink>('Link', linkSchema);
export default Link;