import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';
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

  mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
  }).then(() => {
      console.log("Connected to DB"); 
  }, err => { console.log(err) });

  startJobs();
 
})