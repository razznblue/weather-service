import { validationResult } from "express-validator";

import UserSchema from "../schemas/UserSchema.js";
import { verifyUser, formatPhoneForProfile, subscribedTo, buildLogOutPath } from "../helpers/ProfileHelper.js";
import { hashPassword } from "../helpers/UserHelper.js";

const PROFILE = 'profile';
const logoutPath = buildLogOutPath();

export const renderProfile = async (req, res) => {
  verifyUser(req, res);

  const user = await UserSchema.findOne({ _id: req.userId });
  if (!user) { console.error('UserId in session does exist in DB... HOW??') };

  const username = user?.username;
  const email = user?.email ? user?.email : '';
  const phone = user?.phoneNumber ? formatPhoneForProfile(user?.phoneNumber) : '';
  const subscribedToDailyWeather = subscribedTo(user?.subscriptions, 'daily-weather');
  const subscribedToWeatherAlerts = subscribedTo(user?.subscriptions, 'weather-alert');

  res.render(PROFILE, {
    username, email, phone,
    dailyWeather: subscribedToDailyWeather,
    weatherAlerts: subscribedToWeatherAlerts,
    logoutPath
  });
}

export const updateProfile = async (req, res) => {
  verifyUser(req, res);

  const username = req.body?.username;
  const password = req.body?.password;
  const email = req.body?.email;
  const phone = req.body?.phone;
  const dailyWeatherSubscription = req.body.dailyWeatherReports !== undefined 
    && req.body.dailyWeatherReports === 'on' ? true : false;
  const severeWeatherAlertsSubscription = req.body.severeWeatherAlerts !== undefined 
    && req.body.severeWeatherAlerts === 'on' ? true : false;
  const subscriptions = [dailyWeatherSubscription, severeWeatherAlertsSubscription];

  // On error, return to client
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array();
    return res.render(PROFILE, {
      username, email, phone, alert, 
      dailyWeather: dailyWeatherSubscription,
      weatherAlerts: severeWeatherAlertsSubscription,
      logoutPath
    })
  }

  const user = await UserSchema.findOne({ _id: req.userId });
  if (!user) { console.error('UserId in session does exist in DB... HOW??') };

  if (user.username !== username) {
    user.username = username;
  }
  if (password) {
    user.password = await hashPassword(password, 10);
  }
  if (user.email !== email) {
    user.email = email;
  }
  if (user.phoneNumber !== phone) {
    user.phoneNumber = phone;
  }
  if (dailyWeatherSubscription && !user.subscriptions.includes('daily-weather')) {
    user.subscriptions.push('daily-weather');
  } 
  if (!dailyWeatherSubscription && user.subscriptions.includes('daily-weather')) {
    user.subscriptions = user.subscriptions.filter(e => e !== 'daily-weather');
  }
  if (severeWeatherAlertsSubscription && !user.subscriptions.includes('weather-alert')) {
    user.subscriptions.push('weather-alert');
  }
  if (!severeWeatherAlertsSubscription && user.subscriptions.includes('weather-alert')) {
    user.subscriptions = user.subscriptions.filter(e => e !== 'weather-alert');
  }
  await user.save();

  return res.render(PROFILE, {
    username, email, phone,
    successMsg: 'Updated your information!',
    dailyWeather: dailyWeatherSubscription,
    weatherAlerts: severeWeatherAlertsSubscription,
    logoutPath
  })
}