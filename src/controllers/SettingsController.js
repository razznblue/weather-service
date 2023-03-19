import { buildLogOutPath } from "../helpers/ProfileHelper.js";


const SETTINGS = 'settings';
const logoutPath = buildLogOutPath();

export const renderSettings = async (req, res) => {
  res.render(SETTINGS, {
    logoutPath
  });
}