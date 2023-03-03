import nodeCron from 'node-cron';
import axios from 'axios';

import OpenWeatherManager from '../managers/OpenWeatherManager.js';

import Constants from '../constants/constants.js';
const { URL, CRON } = Constants;
const { BASE_URL, LOCAL_HOST } = URL;

const baseUrl = process.env.NODE_ENV === 'production' 
  ? BASE_URL : LOCAL_HOST;

const openWeatherManager = new OpenWeatherManager();

const dailyWeatherJob = nodeCron.schedule(CRON.DAILY_AT_SEVEN_THIRTY, async () => {
  console.log('Firing off dailyWeatherJob.');
  openWeatherManager.sendDailyWeatherText();
}, {scheduled: false});

const testJob = nodeCron.schedule(CRON.EVERY_MINUTE, () => {
  console.log('Hello Malevolence. Have you received our communications?');
}, {scheduled: false});

const startJobs = async () => {
  console.log(`Starting All Cron Jobs`);
  testJob.start();
  dailyWeatherJob.start();
}

export default startJobs;

