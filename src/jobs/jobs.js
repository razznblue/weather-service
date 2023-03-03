import OpenWeatherManager from '../managers/OpenWeatherManager.js';
import CronJob from '../entities/CronJob.js';
import CronJobIntervals from '../constants/cron/CronJobIntervals.js';

const { DAILY_AT_SEVEN_THIRTY, EVERY_MINUTE } = CronJobIntervals;

const openWeatherManager = new OpenWeatherManager();


// Define Cron Jobs
const dailyWeatherJob = new CronJob('dailyWeatherJob', DAILY_AT_SEVEN_THIRTY, () => {
  console.log('Firing off dailyWeatherJob.');
  openWeatherManager.sendDailyWeatherText();
});

const testJob = new CronJob('testJob', EVERY_MINUTE, () => {
  console.log('Hello Malevolence. Have you received our communications?');
});

// Helper Functions
const startCronJob = (job) => {
  console.log(`Starting CronJob [${job.name}] at interval [${job.getIntervalName()}]`);
  job.trigger();
}

const startJobs = async () => {
  console.log(`Starting All Cron Jobs`);
  startCronJob(testJob);
  startCronJob(dailyWeatherJob);
}

export default startJobs;
