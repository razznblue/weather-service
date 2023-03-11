import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv';
dotenv.config();

import Constants from '../constants/constants.js';
import SMSManager from './SMSManager.js';
import TextType from '../enums/TextType.js';


const { MESSAGES } = Constants;
const { NO_ALERTS_FOUND, ALERT_DETECTED } = MESSAGES;

class AlertsManager {
  constructor() {
    this.baseUrl = "https://www.kmbc.com/alerts";
    this.smsManager = new SMSManager();
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
        const msg = `Severe weather alert detected. \n${Constants.URL.KMBC_ALERTS_URL}`;
        await this.smsManager.sendAlertsText(msg, process.env.MY_PHONE_NUMBER, TextType.WeatherAlert);
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