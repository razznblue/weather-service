import UserSettingsSchema from "../schemas/UserSettingsSchema.js";
import { buildLogOutPath } from "../helpers/ProfileHelper.js";


class UserSettings {
  constructor(userId) {
    this.userId = userId;
  }

  // Create an empty UserSettings so it exists when the user updates it in the future.
  async init() {
    const userId = this.userId;
    const exists = await UserSettingsSchema.exists({ userId: userId });
    if (!exists) {
      try {
        const userSettings = new UserSettingsSchema({
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
    const userSettings = await UserSettingsSchema.findOne({ userId: userId });
    if (userSettings) {
      const keys = updateMap.map(entry => entry.field);
      const values = updateMap.map(entry => entry.value);
      try {
        for (let i = 0; i < updateMap.length; i++) {
          userSettings[keys[i]] = values[i];
        }
        await userSettings.save();
        const returnData = {
          defaultCity: req.body.defaultCity,
          secondaryCity: req.body.secondaryCity,
          defaultZipCode: req.body.defaultZipCode,
          secondaryZipCode: req.body.secondaryZipCode,
          receiveIconsWithTexts: !req.body.receiveIconsWithTexts ? false : true,
          receiveLinksWithTexts: !req.body.receiveLinksWithTexts ? false : true,
          successMsg: 'Updated your settings!',
          logoutPath: buildLogOutPath()
        };
        return res.render('settings', returnData);
      } catch(err) {
        console.log(err);
      }
    } else {
      console.error(`Could not find UserSettings with userId ${userId} to update`);
    }
  }

}

export default UserSettings;