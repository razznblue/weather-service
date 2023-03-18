import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

import setMiddleware from './config/middleware.js';
import connectToDB from './config/db.js';
import startJobs from './jobs/jobs.js';
import Constants from './constants/constants.js';


const baseUrl = Constants.BASE_URL;
const port = process.env.PORT || 3000;

const app = express();
setMiddleware(app);

const EVERY_FIVE_MINUTES = 300000;
(async () => {
  setInterval(async () => {
    const res = await axios.get(baseUrl);
    console.log(`App Ping - ${baseUrl}. Status: ${res.data.message}`);
  }, EVERY_FIVE_MINUTES);
})();

app.listen(port, () => {
  console.log(`Weather-Service running on port ${port}`);
  connectToDB();
  startJobs();
})