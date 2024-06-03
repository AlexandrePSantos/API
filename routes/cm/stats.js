const statsRouter = require('express').Router();
const controller = require('../../controllers/cm/stats');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
statsRouter.use(authMiddleware);

statsRouter.get('/user/:idUser', controller.userStats);
statsRouter.get('/project/:idProject', controller.projectStats);
statsRouter.get('/task/:idTask', controller.taskStats);

module.exports = statsRouter;