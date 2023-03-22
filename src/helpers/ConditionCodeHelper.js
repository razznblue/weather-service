import ConditionCodeModel from "../models/ConditionCodeModel.js";


export const getConditionCode = async (openWeatherId) => {
  const exists = await ConditionCodeModel.exists({ openWeatherId: openWeatherId });
  if (exists) {
    return await ConditionCodeModel.findOne({ openWeatherId: openWeatherId });
  }
}