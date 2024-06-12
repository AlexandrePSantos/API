const obsRouter = require('express').Router();
const controller = require('../../controllers/cm/obs');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
obsRouter.use(authMiddleware);

//project CRUD
obsRouter.get('/', controller.getAll); //read all
obsRouter.get('/:idobs', controller.getById); //read one by his id
obsRouter.post('/create', controller.create); //create new project

module.exports = obsRouter;