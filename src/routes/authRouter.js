import express from 'express';

import { validateRegisterForm, validateLoginForm } from '../helpers/ValidationHelper.js';
import { registerUser, loginUser, logout } from '../controllers/authController.js';


const auth = express.Router();

auth.get('/register', (req, res) => res.render('register') );
auth.post('/register', validateRegisterForm(), async (req, res) => await registerUser(req, res));
auth.get('/login', (req, res) => res.render('login') );
auth.post('/login', validateLoginForm(), async (req, res) => { await loginUser(req, res) });
auth.get('/logout', (req, res) => logout(req, res));

export default auth;