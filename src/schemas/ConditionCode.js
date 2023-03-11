import mongoose from 'mongoose';

const collectionName = "ConditionCode";

const conditionCodeSchema = new mongoose.Schema (
  {
    openWeatherId: {
      type: String,
      required: true
    },
    main: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    iconUrl: {
      type: String,
      required: true
    }
  }, { versionKey: false, timestamps: false, collection: collectionName }
);

const ConditionCodeSchema = mongoose.model(collectionName, conditionCodeSchema);
 
export default ConditionCodeSchema;
