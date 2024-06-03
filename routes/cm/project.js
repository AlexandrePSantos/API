const projectRouter = require('express').Router();
const controller = require('../../controllers/cm/project');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
projectRouter.use(authMiddleware);

//project CRUD
projectRouter.get('/', controller.getAll); //read all
projectRouter.get('/:idproject', controller.getById); //read one by his id
projectRouter.post('/create', controller.create); //create new project
projectRouter.put('/update/:idproject', controller.update); //update project
projectRouter.delete('/delete/:idproject', controller.delete); //delete project

// Novas rotas para o projeto
projectRouter.get('/:idproject/tasks', controller.getTasks);
projectRouter.get('/:idproject/users', controller.getUsers);
projectRouter.post('/:idproject/assignUser/:iduser', controller.assignUser);
projectRouter.delete('/:idproject/removeUser/:iduser', controller.removeUser);
projectRouter.put('/:idproject/complete', controller.completeProject);
projectRouter.put('/:idproject/performanceReview', controller.setPerformanceReview);

module.exports = projectRouter;