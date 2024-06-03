const statsRouter = require('express').Router();
const controller = require('../../controllers/cm/state');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
statsRouter.use(authMiddleware);

statsRouter.get('/user/:idUser', controller.usersStats);
statsRouter.get('/project/:idProject', controller.projectsStats);
statsRouter.get('/task/:idTask', controller.tasksStats);