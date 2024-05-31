const projectRouter = require('express').Router();
const controller = require('../../controllers/cm/project');

//project CRUD
projectRouter.get('/', controller.getAll); //read all
projectRouter.get('/:idToken', controller.getById); //read one by his id
projectRouter.post('/create', controller.create); //create new project
projectRouter.put('/update', controller.update); //update project
projectRouter.delete('/delete/:idToken', controller.delete); //delete project

module.exports = projectRouter;