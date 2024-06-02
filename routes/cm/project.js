const projectRouter = require('express').Router();
const controller = require('../../controllers/cm/project');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
projectRouter.use(authMiddleware);

//project CRUD
projectRouter.get('/', controller.getAll); //read all
projectRouter.get('/:idProject', controller.getById); //read one by his id
projectRouter.post('/create', controller.create); //create new project
projectRouter.put('/update/:idProject', controller.update); //update project
projectRouter.delete('/delete/:idProject', controller.delete); //delete project

module.exports = projectRouter;