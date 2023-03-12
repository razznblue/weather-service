import bcrypt from 'bcrypt';

import UserSchema from "../schemas/UserSchema.js";
import UserSubscription from '../enums/UserSubscription.js';


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
        return this.renderRegister(res, 'Unknown Error Occurred')
      }
    }
    return this.renderRegister(res, 'Username already exists');
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

  renderRegister(res, msg) {
    return res.render('register', {
      username: this.username, email: this.email, phone: this.phone, alert: [{ msg: msg }]
    })
  }

}

const hashPassword = async (pass, saltRounds) => {
  return await bcrypt.hash(pass, saltRounds);
}

const comparePassword = async (plaintextPassword, hash) => {
  return await bcrypt.compare(plaintextPassword, hash);
}

export default User;