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
          /* Scrape the alert and send it to myself
          1) Use the ALERT_DETECTED constant as the header
          2) Send a category of the weather: HEAVY RAIN, TORNADO, HURRICANE, etc.
          3) Send a short description of the alert
          4) Send a url to the website so i can click on it from the text msg */
  
        // TODO need to wait until an alert happens so i can see how the html is structure on their site.
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