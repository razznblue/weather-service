import { validationResult } from "express-validator";

import UserSettings from "../entities/UserSettings.js";
import { verifyUser, buildLogOutPath } from "../helpers/ProfileHelper.js";

const SETTINGS = 'settings';
const logoutPath = buildLogOutPath();

export const renderSettings = async (req, res) => {
  verifyUser(req, res);
  res.render(SETTINGS, {
    logoutPath
  });
}

export const updateSettings = async (req, res) => {
  verifyUser(req, res);

  const errors = validationResult(req);
  console.log(JSON.stringify(errors));
  if (!errors.isEmpty()) {
    const alert = errors.array();
    console.log('errors: ' + alert);
    return res.render(SETTINGS, {
      alert, logoutPath
    })
  }

  const updateMap = getFieldSettingsToUpdate(req);

  const userSettings = new UserSettings(req.userId);
  await userSettings.init();
  await userSettings.updateUserSettings(updateMap, res);
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