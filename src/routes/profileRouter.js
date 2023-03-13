import express from 'express';

import { renderProfile } from '../controllers/ProfileController.js';


const profile = express.Router();

profile.get('/', async (req, res) => await renderProfile(req, res));

export default profile;