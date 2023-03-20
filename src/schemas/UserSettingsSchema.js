import mongoose from 'mongoose';

const collectionName = "UserSettings";
const userSettingsSchema = new mongoose.Schema (
  {
    userId: {
      type: mongoose.Types.ObjectId, ref: 'Users',
    },
    defaultCity: { type: String },
    secondaryCity: { type: String },
    defaultZipCode: { type: String },
    secondaryZipCode: { type: String },
    receiveIconsWithTextAlerts: { type: Boolean },
    receiveLinksWithTextAlerts: { type: Boolean },
  }, { timestamps: true, versionKey: false, collection: collectionName }
);

const UserSettingsSchema = mongoose.model(collectionName, userSettingsSchema);
 
export default UserSettingsSchema;
