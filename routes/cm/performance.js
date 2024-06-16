const performanceRouter = require('express').Router();
const controller = require('../../controllers/cm/performance');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
performanceRouter.use(authMiddleware);

//project CRUD
performanceRouter.get('/', controller.getAll); //read all
performanceRouter.get('/:idtask', controller.getById); //read one by his id
performanceRouter.post('/create', controller.create); //create new project

module.exports = performanceRouter;