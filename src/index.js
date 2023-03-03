import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import SMSManager from './managers/SMSManager.js';
import OpenWeatherManager from './managers/OpenWeatherManager.js';
import AlertsManager from './managers/AlertsManager.js';


const app = express();
const port = process.env.PORT || 3000;

const openWeatherManager = new OpenWeatherManager();

const alertsManager = new AlertsManager();

const smsManager = new SMSManager();



// Routes
app.get(['/', '/health'], (req, res) => {
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

app.get('/alerts', async (req, res) => {
  const alertResponse = await alertsManager.sendAlertData();
  res.send(alertResponse);
})

app.get('/weather', async (req, res) => {
  const weatherData = await openWeatherManager.fetchCurrentWeather();
  smsManager.sendText(weatherData);
  res.send(weatherData);
})


// APP
app.listen(port, () => {
  console.log(`KC-Weather-Alerts running on port ${port}`);
})