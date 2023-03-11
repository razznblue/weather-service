import mongoose from 'mongoose';

const collectionName = "Texts";
const textSchema = new mongoose.Schema (
  {
    sender: {
      type: String,
      required: true
    },
    recipient: {
      type: String,
      required: true
    },
    textType: {
      type: String
    },
    message: {
      type: String,
    },
    timeSent: {
      type: Date
    },
    sid: {
      type: String
    },
    price: {
      type: String
    },
    error: {
      type: String
    },
    mediaUrl: {
      type: String
    },
    conditionCodeId: { 
      type: mongoose.Types.ObjectId, ref: 'ConditionCode',
    }
  }, { versionKey: false, collection: collectionName }
);

const TextSchema = mongoose.model(collectionName, textSchema);
 
export default TextSchema;
