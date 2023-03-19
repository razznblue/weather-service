import express from 'express';

import { renderSettings } from '../controllers/SettingsController.js';


const settings = express.Router();

settings.get('/', async (req, res) => await renderSettings(req, res));
//settings.put('/update', async (req, res) => updateSettings(req, res));

export default settings;