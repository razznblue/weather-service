import express from 'express';

import AlertsManager from '../managers/AlertsManager.js';
import OpenWeatherManager from '../managers/OpenWeatherManager.js';
import SMSManager from '../managers/SMSManager.js';

const router = express.Router();

const openWeatherManager = new OpenWeatherManager();
const alertsManager = new AlertsManager();
const smsManager = new SMSManager();


// Routes
router.get(['/', '/health'], (req, res) => {
  const healthcheck = {
    uptimeInSeconds: process.uptime(),
    responseTime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now()
  };
  try {
      res.send(healthcheck);
  } catch (error) {
      healthcheck.message = error;
      res.send(healthcheck);
  }
})

router.get('/alerts', async (req, res) => {
  const alertResponse = await alertsManager.sendAlertData();
  res.send(alertResponse);
})

router.get('/weather', async (req, res) => {
  const weatherData = await openWeatherManager.fetchCurrentWeather();
  smsManager.sendText(weatherData);
  res.send(weatherData);
})

export default router;