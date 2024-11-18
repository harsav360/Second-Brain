import mongoose,{Model,Document,Schema} from "mongoose";

interface Itag extends Document {
    title:string
}

const TagSchema:Schema<Itag> = new Schema({
    title : {type:String,required : true,unique:true}
});

const Tag:Model<Itag> = mongoose.model('Tag',TagSchema);
export default Tag;