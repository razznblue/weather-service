import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

import User from "../entities/User.js";
import UserSchema from "../schemas/UserSchema.js";
import { comparePassword, renderResponse } from "../helpers/UserHelper.js";
import Constants from "../constants/constants.js";
const baseUrl = process.env.NODE_ENV === 'production' 
  ? Constants.URL.BASE_URL : Constants.URL.LOCAL_HOST;


const sessions = {};
const LOGIN = 'login';
const REGISTER = 'register';

export const registerUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  const dailyWeatherSubscription = req.body.dailyWeatherReports !== undefined 
    && req.body.dailyWeatherReports === 'true' ? (req.body.dailyWeatherReports === 'true') : false;
  const severeWeatherAlertsSubscription = req.body.severeWeatherAlerts !== undefined 
    && req.body.severeWeatherAlerts === 'true' ? (req.body.severeWeatherAlerts === 'true') : false;
  const subscriptions = [dailyWeatherSubscription, severeWeatherAlertsSubscription];

  // On error, return to client
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array();
    return res.render(REGISTER, {
      username, email, phone, alert
    })
  }

  // Assume no errors, so save the user in DB
  const user = new User(username, password, email, formatPhone(phone), subscriptions);
  await user.register(res);

  // Return Success Msg
  return res.render(REGISTER, {
    username, email, phone, successMsg: 'Registered successfully!'
  })
}


//add token to cookies for use when calling other route: https://dev.to/franciscomendes10866/using-cookies-with-jwt-in-node-js-8fn
export const loginUser = async (req, res) => {
  const username = req.body?.username;
  const pass = req.body?.password;

  // On form validation errors, return to client
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array();
    return res.render(LOGIN, {
      username, alert
    })
  }

  const user = await UserSchema.findOne({ username: username });
  if (user) {
    const authenticated = await comparePassword(pass, user.password);
    if (authenticated) {
      const sessionToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.cookie("session_token", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })

      return res.redirect(`${baseUrl}/profile`);
      //const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
      //return res.header('auth_token', token).send({ token: token });
    } else {
      renderResponse(res, LOGIN, 'Invalid password', { username });
    }
  } else {
    renderResponse(res, LOGIN, 'User not found', { username });
  }
}


export const logout = (req, res) => {
  res.clearCookie('session_token');
  res.render(LOGIN, {
    successMsg: 'You are logged out'
  });
}




// HELPERS
const formatPhone = (googlePhone) => {
  return `+1${googlePhone.match(/\d/g).join("")}`
}