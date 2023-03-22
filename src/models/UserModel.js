import mongoose from 'mongoose';

const collectionName = "Users";
const userSchema = new mongoose.Schema (
  {
    username: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String, required: true },
    registerDate: { type: Date },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    subscriptions: { type: [{ type: String }] }
  }, { timestamps: true, versionKey: false, collection: collectionName }
);

const UserModel = mongoose.model(collectionName, userSchema);
 
export default UserModel;
