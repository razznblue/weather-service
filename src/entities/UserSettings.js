import UserSettingsModel from "../models/UserSettingsModel.js";
import { buildLogOutPath } from "../helpers/ProfileHelper.js";
import { getReturnData } from "../helpers/UserSettingsHelper.js";
import Constants from "../constants/constants.js";


const { VIEWS } = Constants;

class UserSettings {
  constructor(userId) {
    this.userId = userId;
  }

  // Create an empty UserSettings so it exists when the user updates it in the future.
  async init() {
    const userId = this.userId;
    const exists = await UserSettingsModel.exists({ userId: userId });
    if (!exists) {
      try {
        const userSettings = new UserSettingsModel({
          userId: userId,
        });
        await userSettings.save();
        console.log(`Created new UserSettings, \n${userSettings}`);
        return;
      } catch (err) {
        console.error(`Could not create UserSettings for user ${userId} due to error.`);
        console.error(err);
      }
    }
  }

  async updateUserSettings(updateMap, req, res) {
    const userId = this.userId;
    const userSettings = await UserSettingsModel.findOne({ userId: userId });
    if (userSettings) {
      const keys = updateMap.map(entry => entry.field);
      const values = updateMap.map(entry => entry.value);
      try {
        for (let i = 0; i < updateMap.length; i++) {
          userSettings[keys[i]] = values[i];
        }
        await userSettings.save();

        const returnData = await getReturnData(userId);
        returnData.successMsg = 'Updated your settings!';
        returnData.logoutPath = buildLogOutPath();
        return res.render(VIEWS.SETTINGS, returnData);
      } catch(err) {
        console.error(err);
      }
    } else {
      console.error(`Could not find UserSettings with userId ${userId} to update`);
    }
  }

}

export default UserSettings;