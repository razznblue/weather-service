import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import router from './routes/router.js';
import startJobs from './jobs/jobs.js';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', router);

// APP
app.listen(port, () => {
  console.log(`Weather-Service running on port ${port}`);
  startJobs();
})