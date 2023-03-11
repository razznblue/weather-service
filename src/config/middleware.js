import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import router from "../routes/router.js";


const __dirname = dirname(fileURLToPath(import.meta.url));

const setMiddleware = (app) => {
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'ejs')

  app.use('/', router);
  app.use(express.static(path.join(__dirname, '..', 'public')));
  //app.use(express.static(__dirname + '/public'));
  app.use(express.urlencoded({ extended: true })); // Enable our form data to be accessed by the 'req' variable in our routes
  app.use(express.json());

}

export default setMiddleware;