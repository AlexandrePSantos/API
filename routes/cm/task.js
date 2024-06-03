const taskRouter = require('express').Router();
const controller = require('../../controllers/cm/task');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
taskRouter.use(authMiddleware);

//task CRUD
taskRouter.get('/', controller.getAll); //read all
taskRouter.get('/:idtask', controller.getById); //read one by his id
taskRouter.post('/create', controller.create); //create new task
taskRouter.put('/update/:idtask', controller.update); //update task
taskRouter.delete('/delete/:idtask', controller.delete); //delete task

// novas rotas para tarefas
taskRouter.get('/:idtask/users', controller.getUsers);
taskRouter.post('/:idtask/assignUser/:iduser', controller.assignUser);
taskRouter.delete('/:idtask/removeUser/:iduser', controller.removeUser);
taskRouter.put('/:idtask/complete', controller.completeTask);
taskRouter.put('/:idtask/state', controller.setState);

module.exports = taskRouter;