import nodeCron from 'node-cron';

class CronJob {
  constructor(name, interval, jobDetails) {
    this.name = name;
    this.interval = interval;
    this.job = this.createJob(jobDetails);
  }

  trigger() {
    this.job.start();
  }
  stopJob() {
    this.job.stop();
  }

  getIntervalName() {
    return this.interval.name;
  }

  createJob(jobDetails) {
    return nodeCron.schedule(this.interval.expression, async () => {
      jobDetails();
    }, {scheduled: false, timezone: "America/Chicago"});
  }

}

export default CronJob;
