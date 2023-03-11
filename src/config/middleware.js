import router from "../routes/router.js";


const setMiddleware = (app) => {
  app.use('/', router);
}

export default setMiddleware;