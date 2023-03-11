import ConditionCodeSchema from "../schemas/ConditionCode.js";

export const getConditionCode = async (openWeatherId) => {
  const exists = await ConditionCodeSchema.exists({ openWeatherId: openWeatherId });
  if (exists) {
    return await ConditionCodeSchema.findOne({ openWeatherId: openWeatherId });
  }
}