import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

import Text from '../entities/Text.js';
import { getConditionCode } from '../helpers/ConditionCodeHelper.js';



class SMSManager {
  constructor() {
    this.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID; 
    this.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    this.smsClient = twilio(this.twilioAccountSid, this.twilioAuthToken);

    this.twilioTestPhoneNumber = process.env.TWILIO_TEST_PHONE_NUMBER;
    this.myPhoneNumber = process.env.MY_PHONE_NUMBER;
  }

  async sendWeatherText(msg, recipientPhoneNumber, textType, openWeatherId) {
    const recipient = recipientPhoneNumber ? recipientPhoneNumber : this.myPhoneNumber;

    const text = new Text(this.twilioTestPhoneNumber, recipient, textType, msg);
    const conditionCode = await getConditionCode(openWeatherId);
    const mediaUrl = conditionCode.iconUrl ? conditionCode.iconUrl : [];

    try {
      const message = await this.smsClient.messages.create({
        body: msg,
        from: this.twilioTestPhoneNumber,
        mediaUrl: [mediaUrl],
        to: recipient,
      });
      text.setMessage(message.body);
      text.setTimeSent(message.dateCreated);
      text.setTwilioSid(message.sid);
      text.setPrice(message.price);
      text.setError(message.errorMessage);
      text.setMediaUrl(conditionCode.iconUrl);
      text.setConditionCodeId(conditionCode._id);
      await text.save();
      return {status: 200, msg: "Daily weather report sent successfully"};

    } catch (err) {
      console.error(err);
      return {status: 400, msg: "Error sending daily weather report. See logs for details"};
    }
  }


  async sendAlertsText(msg, recipientPhoneNumber, textType) {
    const recipient = recipientPhoneNumber ? recipientPhoneNumber : this.myPhoneNumber;
    const text = new Text(this.twilioTestPhoneNumber, recipient, textType, msg);

    try {
      const message = await this.smsClient.messages.create({
        body: msg,
        from: this.twilioTestPhoneNumber,
        to: recipient,
      });
      text.setMessage(message.body);
      text.setTimeSent(message.dateCreated);
      text.setTwilioSid(message.sid);
      text.setPrice(message.price);
      text.setError(message.errorMessage);
      await text.save();
      return {status: 200, msg: "Severe weather alert sent successfully"};

    } catch (err) {
      console.error(err);
      return {status: 400, msg: "Error sending severe weather alert. See logs for details"};
    }

  }

}

export default SMSManager;