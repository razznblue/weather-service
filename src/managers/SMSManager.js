import twilio from 'twilio';
import dotenv from 'dotenv';

import Text from '../entities/Text.js';

dotenv.config();


class SMSManager {
  constructor() {
    this.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID; 
    this.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    this.smsClient = twilio(this.twilioAccountSid, this.twilioAuthToken);

    this.twilioTestPhoneNumber = process.env.TWILIO_TEST_PHONE_NUMBER;
    this.myPhoneNumber = process.env.MY_PHONE_NUMBER;
  }

  async sendText(msg, recipientPhoneNumber, textType) {
    const recipient = recipientPhoneNumber ? recipientPhoneNumber : this.myPhoneNumber;

    // Create Text
    const text = new Text(this.twilioTestPhoneNumber, recipient, textType, msg);

    // Send SMS Text to the recipient
    const message = await this.smsClient.messages.create({
      body: msg,
      from: this.twilioTestPhoneNumber,
      to: recipient
    });
    text.setMessage(message.body);
    text.setTimeSent(message.dateCreated);
    text.setTwilioSid(message.sid);
    text.setPrice(message.price);
    text.setError(message.errorMessage);

    // Save text to DB
    await text.save();
  }

}

export default SMSManager;