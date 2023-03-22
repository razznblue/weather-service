import bcrypt from 'bcrypt';

import UserSchema from "../schemas/UserSchema.js";
import UserSubscription from '../enums/UserSubscription.js';
import { hashPassword, renderResponse } from '../helpers/UserHelper.js';


class User {
  constructor(username, password, email, phone, subscriptions) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.subscriptions = this.formatSubscriptions(subscriptions);
    this.registerDate = new Date().toISOString();
  }

  // Returns true if user was created, false otherwise
  async register(res) {
    const exists = await UserSchema.exists({ username: this.username });
    if (!exists) {
      console.debug('creating new User');
      this.password = await hashPassword(this.password, 10);

      try {
        const user = new UserSchema({
          username: this?.username,
          password: this?.password,
          email: this?.email,
          phoneNumber: this?.phone,
          registerDate: this?.registerDate
        });
        for (const subscription of this.subscriptions) {
          user.subscriptions.push(subscription);
        }
        return await user.save();
      } catch (err) {
        console.error(err);
        return renderResponse(res, 'register', 'Unknown Error Occurred', this)
      }
    }
    return renderResponse(res, 'register', 'Username already exists');
  }

  async getId() {
    try {
      const user = await UserSchema.findOne({ username: this.username });
      if (user) {
        return user._id;
      }
    } catch(err) {
      console.log(err);
    }
  }

  formatSubscriptions(subs) {
    const subscriptions = [];
    const dailyWeather = subs[0];
    const weatherAlerts = subs[1];
    if (dailyWeather) {
      subscriptions.push(UserSubscription.DailyWeather);
    }
    if (weatherAlerts) {
      subscriptions.push(UserSubscription.WeatherAlert);
    }
    return subscriptions;
  }

}

export default User;