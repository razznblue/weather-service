import express from 'express';

import AlertsManager from '../managers/AlertsManager.js';
import HealthCheckManager from '../managers/HealthCheckManager.js';
import OpenWeatherManager from '../managers/OpenWeatherManager.js';
import SMSManager from '../managers/SMSManager.js';

const router = express.Router();

const alertsManager = new AlertsManager();
const openWeatherManager = new OpenWeatherManager();


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
  const alertResponse = await alertsManager.sendAlertData();
  res.send(alertResponse);
})

router.get('/weather', async (req, res) => {
  const weatherData = await openWeatherManager.sendDailyWeatherText();
  if (weatherData) {
    res.send(weatherData);
  } else {
    res.send('An Error Occurred while fetching weatherData');
  }
})

export default router;