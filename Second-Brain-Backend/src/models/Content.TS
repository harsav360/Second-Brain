import mongoose from "mongoose";

const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed
const mongoDb = mongoose.Schema;
const contentSchema = new mongoDb({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: mongoDb.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoDb.Types.ObjectId, ref: 'User', required: true },
});

const Content = mongoose.model('Content',contentSchema);
module.exports = Content;