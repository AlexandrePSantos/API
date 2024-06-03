const statsRouter = require('express').Router();
const controller = require('../../controllers/cm/stats');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
statsRouter.use(authMiddleware);

statsRouter.get('/user/:iduser', controller.userStats);
statsRouter.get('/project/:idproject', controller.projectStats);
statsRouter.get('/task/:idtask', controller.taskStats);

module.exports = statsRouter;