import axios from 'axios';
import cheerio from 'cheerio';
import pretty from 'pretty';

import Constants from '../constants/constants.js';

const { URL, DOM, MESSAGES } = Constants;
const { 
  KMBC_ALERTS_URL,
  KMBC_WEATHER_URL 
} = URL;
const { } = DOM;
const { 
  NO_ALERTS_FOUND,
  ALERT_DETECTED
 } = MESSAGES;


class AlertsManager {
  constructor() {
    this.baseUrl = "https://www.kmbc.com/alerts";
  }

  sendAlertData = async () => {
    try {
      const response = await axios.get(this.baseUrl);
      const $ = cheerio.load(response.data);
      const listItems = $(".alerts-content--alerts .alerts-content--alerts-empty h2");
  
      if (this.elementExists($, '.weather-alerts-page .empty')) {
        //sendText(twilioClient, 'Testing sending with new line. \nNo Sever Alerts Occurring now.');
        console.log(NO_ALERTS_FOUND);
        return NO_ALERTS_FOUND;
      } else {
        // TODO need to wait until an alert happens irl so i can see how the html is structured on their site.
        //sendText(twilioClient, `${ALERT_DETECTED}. Visit ${KMBC_ALERTS_URL} for more details.`);
        console.log(ALERT_DETECTED);
        return `${ALERT_DETECTED}. Text Message sent.`
      } 
    } catch(err) {
      console.error(err);
    }
  }
  
  elementExists = ($, path) => {
    return $(path).length === 1 ? true : false;
  }
}

export default AlertsManager;