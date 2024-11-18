import mongoose, {Model,Document,Schema,Types} from "mongoose";


const contentTypes = ['image', 'video', 'article', 'audio'] as const;
type contentType = typeof contentTypes[number];

interface IContent extends Document {
  link : String,
  type:contentType,
  title:String,
  tags:Types.ObjectId[],
  userId:Types.ObjectId
}

const contentSchema: Schema<IContent> = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});


const Content: Model<IContent> = mongoose.model<IContent>('Content', contentSchema);
export default Content;