import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();


class SMSManager {
  constructor() {
    this.twilioAccountSid = process.env.TWILIO_ACCOUNT_SID; 
    this.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
    this.smsClient = twilio(this.twilioAccountSid, this.twilioAuthToken);

    this.twilioTestPhoneNumber = process.env.TWILIO_TEST_PHONE_NUMBER;
    this.myPhoneNumber = process.env.MY_PHONE_NUMBER;
  }

  sendText(msg, recipientPhoneNumber) {
    const recipient = recipientPhoneNumber ? recipientPhoneNumber : this.myPhoneNumber;
    this.smsClient.messages
      .create({
        body: msg,
        from: this.twilioTestPhoneNumber,
        to: recipient
      })
      .then(message => console.log(message.sid))
      .catch(error => console.error(error));

    // Could save every sent text to a DB to keep SMS History.
  }

}

export default SMSManager;