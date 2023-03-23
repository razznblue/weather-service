import CityModel from "./CityModel.js";
import ConditionCodeModel from "./ConditionCodeModel.js";
import TextModel from "./TextModel.js";
import UserModel from "./UserModel.js";
import UserSettingsModel from "./UserSettingsModel.js";


const models = {
  city: CityModel,
  conditionCode: ConditionCodeModel,
  text: TextModel,
  user: UserModel,
  userSettings: UserSettingsModel
};

const BaseModel = {

  async getById(modelName, id) {
    try {
      return await models[modelName].findById(id);
    } catch(err) {
      console.error(`Error getting ${modelName} document by Id`);
    }
  },

  async getByKeyAndValue(modelName, key, value) {
    try {
      const model = await models[modelName].findOne({ [key]: value });
      return model;
    } catch(err) {
      console.error(`Error getting ${modelName} document by key ${key} and value ${value}`);
    }
  }

}

export default BaseModel;