import express from 'express';
import { check, validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();

import AlertsManager from '../managers/AlertsManager.js';
import HealthCheckManager from '../managers/HealthCheckManager.js';
import OpenWeatherManager from '../managers/OpenWeatherManager.js';
import User from '../entities/User.js';

const router = express.Router();

const alertsManager = new AlertsManager();
const openWeatherManager = new OpenWeatherManager();

const accessToken = process.env.ACCESS_TOKEN;


// Routes
router.get(['/', '/health'], (req, res) => {
  const healthCheckManager = new HealthCheckManager();
  let healthStatus;
  try {
    healthStatus = healthCheckManager.getAppHealth();
    res.send(healthStatus);
  } catch (error) {
    healthStatus.message = error;
    res.status(504).send(healthStatus);
  }
})

router.get('/alerts', async (req, res) => {
  if (authenticate(req)) {
    console.debug('Authenticated Request at /alerts');
    const alertResponse = await alertsManager.sendAlertData();
    res.send(alertResponse);
  } else {
    res.status(401).send('Unauthorized');
  }
})

router.get('/weather', async (req, res) => {
  if (authenticate(req)) {
    console.debug('Authenticated Request at /weather');
    const response = await openWeatherManager.sendDailyWeatherText();
    res.status(response.status).send(response.msg);
  } else {
    res.status(401).send('Unauthorized');
  }
})

router.get('/forecast', async(req, res) => {
  const data = await openWeatherManager.fetchFiveDayWeather();
  res.send(data);
})

// User-Facing Routes
router.get('/register', (req, res) => {
  res.render('register');
})

// TODO put validation into own file: https://stackoverflow.com/questions/70282049/how-to-make-a-function-validator-for-express-validator-and-use-it-as-middleware
router.post('/register', [
  check('username', 'Username must be 6+ characters long')
    .exists().trim().isLength({min: 3}),
  check('email', 'Email is not valid')
    .isEmail().trim().normalizeEmail(),
  check('password', 'Password must be 6+ characters long')
    .exists().isLength({min: 6})
], async (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone !== undefined || req.body.phone !== null ? req.body.phone.match(/\d/g).join("") : req.body.phone;
  const dailyWeatherSubscription = req.body.dailyWeatherReports !== undefined 
    && req.body.dailyWeatherReports === 'true' ? (req.body.dailyWeatherReports === 'true') : false;
  const severeWeatherAlertsSubscription = req.body.severeWeatherAlerts !== undefined 
    && req.body.severeWeatherAlerts === 'true' ? (req.body.severeWeatherAlerts === 'true') : false;
  const subscriptions = [dailyWeatherSubscription, severeWeatherAlertsSubscription];

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //return res.status(422).jsonp(errors.array())
    const alert = errors.array();
    return res.render('register', {
      username, email, phone, alert
    })
  }



  // Assume no errors, so save the user in DB
  console.log('phone: ' + phone);
  const trimmedPhone = formatPhone(phone);
  console.log('trimmedPhone' + trimmedPhone);
  const user = new User(username, password, email, trimmedPhone, subscriptions);
  const success = await user.register();
  if (!success) {
    const alert = [{
      msg: 'Unknown error occurred'
    }]
    return res.render('register', {
      username, email, phone, alert
    })
  }


  // Return Success Msg
  const successMsg = 'Registered successfully!'
  return res.render('register', {
    username, email, phone, successMsg
  })

})

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/profile', (req, res) => {
  res.render('profile');
})

const authenticate = (req) => {
  return req.query.token === accessToken ? true : false;
}

const formatPhone = (googlePhone) => {
  return `+1${googlePhone.match(/\d/g).join("")}`
}

export default router;