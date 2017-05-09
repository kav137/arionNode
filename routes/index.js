const express = require('express');
const ensureLogin = require('connect-ensure-login');

const loginRouter = require('./login.js');
const logoutRouter = require('./logout.js');
const apiRouter = require('./api');
const arionRouter = require('./arion');


const publicRouter = express.Router();
const secureRouter = express.Router();
const appRouter = express.Router();

publicRouter.use(loginRouter);
secureRouter.use('/api', apiRouter);
secureRouter.use(arionRouter);
secureRouter.use(logoutRouter);

appRouter.use(publicRouter);
appRouter.use(ensureLogin.ensureLoggedIn(), secureRouter);

module.exports = appRouter;

