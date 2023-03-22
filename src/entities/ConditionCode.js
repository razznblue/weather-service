import ConditionCodeModel from "../models/ConditionCodeModel.js";


class ConditionCode {
  constructor(openWeatherId, main, description, icon) {
    this.openWeatherId = openWeatherId;
    this.main = main;
    this.description = description;
    this.icon = icon;
    this.setIconUrl(this.icon);
  }

  async save() {
    const exists = await ConditionCodeModel.exists({ openWeatherId: this.openWeatherId });
    if (!exists) {

      const conditionCode = new ConditionCodeModel({
        openWeatherId: this.openWeatherId,
        main: this.main,
        textType: this.textType,
        description: this.description,
        icon: this.icon,
        iconUrl: this.iconUrl
      });

      const savedConditionCode = await conditionCode.save();
      if (savedConditionCode.openWeatherId) {
        console.log(`Saved a new ConditionCode ${savedConditionCode.openWeatherId}`);
      }
      
    }
  }

  setIconUrl(iconCode) {
    this.iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }

}

export default ConditionCode;