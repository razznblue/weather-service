import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import AlertsManager from '../managers/AlertsManager.js';
import HealthCheckManager from '../managers/HealthCheckManager.js';
import OpenWeatherManager from '../managers/OpenWeatherManager.js';

import { sessionAuth } from '../config/auth.js';
import auth from './authRouter.js';
import jobs from './jobsRouter.js';
import profile from './profileRouter.js';
import settings from './settingsRouter.js';


const router = express.Router();

const alertsManager = new AlertsManager();
const openWeatherManager = new OpenWeatherManager();

const accessToken = process.env.ACCESS_TOKEN;

router.use('/auth', auth);
router.use('/jobs', jobs);
router.use('/profile', sessionAuth, profile);
router.use('/settings', sessionAuth, settings);

// Routes
router.get('/', (req, res) => res.redirect('/auth/login'));


router.get('/health', (req, res) => {
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


const authenticate = (req) => {
  return req.query.token === accessToken ? true : false;
}

export default router;