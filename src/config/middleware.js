import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

import router from "../routes/router.js";


const __dirname = dirname(fileURLToPath(import.meta.url));

const setMiddleware = (app) => {
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs')

  app.use(methodOverride('_method')); // Enable PUT and DELETE where client doesn't support it
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use('/', router);
}

export default setMiddleware;