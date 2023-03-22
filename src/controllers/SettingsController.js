import { validationResult } from "express-validator";

import OpenWeatherManager from "../managers/OpenWeatherManager.js";
import UserSettings from "../entities/UserSettings.js";
import { verifyUser, buildLogOutPath } from "../helpers/ProfileHelper.js";
import { getReturnData } from "../helpers/UserSettingsHelper.js";
import Constants from "../constants/constants.js";


const { VIEWS } = Constants;
const logoutPath = buildLogOutPath();
const openWeatherManager = new OpenWeatherManager();

export const renderSettings = async (req, res) => {
  verifyUser(req, res);

  const returnData = await getReturnData(req.userId);
  returnData.logoutPath = logoutPath;
  return res.render(VIEWS.SETTINGS, returnData);
}

export const updateSettings = async (req, res) => {
  verifyUser(req, res);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array();

    const returnData = await getReturnData(req.userId);
    returnData.alert = alert;
    returnData.logoutPath = logoutPath;
    return res.render(VIEWS.SETTINGS, returnData);
  }

  const updateMap = getFieldSettingsToUpdate(req);

  const userSettings = new UserSettings(req.userId);
  await userSettings.init();
  await userSettings.updateUserSettings(updateMap, req, res);

  // Update city information in the DB
  await saveOrUpdateCities(updateMap);

  return updateMap;
}

const getFieldSettingsToUpdate = (req) => {
  const fieldsToUpdate = [];
  req.body.receiveIconsWithTexts = !req.body.receiveIconsWithTexts ? false : true;
  req.body.receiveLinksWithTexts = !req.body.receiveLinksWithTexts ? false : true;

  const settings = Object.entries(req.body);
  for (const [setting, value] of settings) {
    fieldsToUpdate.push({ 
      field: setting,
      value: value
    });
  }

  return fieldsToUpdate;
}

const saveOrUpdateCities = async (updateMap) => {
  const defaultCity = updateMap.find(entry => entry.field === 'defaultCity');
  const secondaryCity = updateMap.find(entry => entry.field === 'secondaryCity');
  if (defaultCity) {
    await openWeatherManager.fetchAndSaveCityInfo(defaultCity.value);
  }
  if (secondaryCity) {
    await openWeatherManager.fetchAndSaveCityInfo(secondaryCity.value);
  }
}