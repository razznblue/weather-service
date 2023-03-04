import mongoose from 'mongoose';

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
    }
  }, { versionKey: false }
);

const TextSchema = mongoose.model('Text', textSchema);
 
export default TextSchema;
