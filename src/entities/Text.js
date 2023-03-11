import TextSchema from "../schemas/TextSchema.js";

class Text {
  constructor(sender, recipient, textType, message, timeSent) {
    this.sender = sender;
    this.recipient = recipient;
    this.textType = textType;
    this.message = message;
  }

  /**
   * Save a Text Document to the Database to log a history of SMS Messages Sent
   */
  async save() {
    const text = new TextSchema({
      sender: this.sender,
      recipient: this.recipient,
      textType: this.textType,
      message: this.message,
      timeSent: this.timeSent,
      sid: this.sid,
      price: this.price,
      error: this.error,
      mediaUrl: this.mediaUrl,
      conditionCodeId: this.conditionCodeId
    });
    const savedText = await text.save();
    console.log(savedText);
  }

  setMessage(msg) {
    this.message = msg;
  }

  setTimeSent(time) {
    this.timeSent = time;
  }

  setTwilioSid(sid) {
    this.twilioSid = sid;
  }

  setPrice(price) {
    this.price = price;
  }

  setError(error) {
    this.error = error;
  }

  setMediaUrl(mediaUrl) {
    this.mediaUrl = mediaUrl;
  }

  setConditionCodeId(id) {
    this.conditionCodeId = id;
  }

}

export default Text;