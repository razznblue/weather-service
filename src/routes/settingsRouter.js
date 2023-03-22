import express from 'express';

import { renderSettings, updateSettings } from '../controllers/SettingsController.js';
import { validateSettingsUpdate } from '../helpers/ValidationHelper.js';

const settings = express.Router();

settings.get('/', async (req, res) => await renderSettings(req, res));
settings.put('/update', validateSettingsUpdate(), async (req, res) => await updateSettings(req, res));

export default settings;