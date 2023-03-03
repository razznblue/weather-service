import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

import router from './routes/router.js';
import startJobs from './jobs/jobs.js';
import Constants from './constants/constants.js';

const baseUrl = process.env.NODE_ENV === 'production' 
  ? Constants.URL.BASE_URL : Constants.URL.LOCAL_HOST;

const app = express();
const port = process.env.PORT || 3000;

app.use('/', router);

const EVERY_FIVE_MINUTES = 300000;
(async () => {
  setInterval(async () => {
    const res = await axios.get(baseUrl);
    console.log(`App Ping - ${baseUrl}. Status: ${res.data.message}`);
  }, EVERY_FIVE_MINUTES);
})();

// APP
app.listen(port, () => {
  console.log(`Weather-Service running on port ${port}`);
  startJobs();
})