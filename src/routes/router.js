import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

import AlertsManager from '../managers/AlertsManager.js';
import HealthCheckManager from '../managers/HealthCheckManager.js';
import OpenWeatherManager from '../managers/OpenWeatherManager.js';

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
    const weatherData = await openWeatherManager.sendDailyWeatherText();
    if (weatherData) {
      res.send(weatherData);
    } else {
      res.send('An Error Occurred while fetching weatherData');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
})


// User-Facing Routes
router.get('/register', (req, res) => {
  res.render('register');
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

export default router;