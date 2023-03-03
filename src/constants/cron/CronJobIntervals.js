import CronJobInterval from "../../entities/CronJobInterval.js";

const CronJobIntervals = {
  EVERY_MINUTE: new CronJobInterval('EVERY_MINUTE', '* * * * *'),
  DAILY_AT_SEVEN_THIRTY: new CronJobInterval('DAILY_AT_SEVEN_THIRTY', '30 7 * * *')
}

export default CronJobIntervals;