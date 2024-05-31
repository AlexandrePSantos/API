const authRouter = require('express').Router();
const controller = require('../../controllers/cm/auth');

authRouter.post('/signin', controller.signin);
authRouter.post('/signup', controller.signup);

module.exports = authRouter;