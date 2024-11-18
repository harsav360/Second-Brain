import mongoose, { Document, Schema, Model } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
}


const userSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
