import UserSettingsModel from "../models/UserSettingsModel.js";

export const getReturnData = async (userId) => {
  const returnData = {};
  const user = await UserSettingsModel.findOne({userId: userId})
    .select({ "_id": 0, "defaultCity": 1, "secondaryCity": 1, "defaultZipCode": 1, "secondaryZipCode": 1, "receiveIconsWithTexts": 1, "receiveLinksWithTexts":1})
  if (user) {
    const entries = Object.entries(user.toObject());
    for (const [key] of entries) {
      if (user[key] || user[key] === '' || user[key] === false) {
        returnData[key] = user[key];
      }
    }
  }
  return returnData;
}