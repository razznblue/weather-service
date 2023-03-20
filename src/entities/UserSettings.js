import UserSettingsSchema from "../schemas/UserSettingsSchema.js";


class UserSettings {
  constructor(userId) {
    this.userId = userId;
  }

  // Create an empty UserSettings so it exists when the user updates it in the future.
  async createEmpty() {
    const userId = this.userId;
    const exists = await UserSettingsSchema.exists({ userId: userId });
    if (!exists) {
      console.debug('creating new UserSettings');

      try {
        const userSettings = new UserSettingsSchema({
          userId: userId,
        });
        console.log(userSettings);
        return await userSettings.save();
      } catch (err) {
        console.error(`Could not create UserSettings for user ${userId} due to error.`);
        console.error(err);
      }
    }
  }

}

export default UserSettings;