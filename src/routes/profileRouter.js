import express from 'express';

import { renderProfile, updateProfile } from '../controllers/ProfileController.js';
import { validateProfileUpdate } from '../helpers/ValidationHelper.js';


const profile = express.Router();

profile.get('/', async (req, res) => await renderProfile(req, res));
profile.put('/update', validateProfileUpdate(), async (req, res) => updateProfile(req, res));

export default profile;