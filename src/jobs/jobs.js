import OpenWeatherManager from '../managers/OpenWeatherManager.js';
import AlertsManager from '../managers/AlertsManager.js';
import CronJob from '../entities/CronJob.js';
import CronJobIntervals from '../constants/cron/CronJobIntervals.js';

const { DAILY_AT_SEVEN_THIRTY_AM, EVERY_MINUTE, EVERY_FIVE_MINUTES } = CronJobIntervals;

const openWeatherManager = new OpenWeatherManager();
const alertsManager = new AlertsManager();


// Define Cron Jobs
const dailyWeatherJob = new CronJob('dailyWeatherJob', DAILY_AT_SEVEN_THIRTY_AM, async () => {
  console.log('Firing off dailyWeatherJob.');
  await openWeatherManager.sendDailyWeatherText();
});

const alertsJob = new CronJob('alertsJob', EVERY_FIVE_MINUTES, async () => {
  await alertsManager.sendAlertData();
});

// Helper Functions
const startCronJob = (job) => {
  console.log(`Starting CronJob [${job.name}] at interval [${job.getIntervalName()}]`);
  job.trigger();
}

const startJobs = async () => {
  console.log(`Starting All Cron Jobs`);
  startCronJob(alertsJob);
  startCronJob(dailyWeatherJob);
}

export default startJobs;
