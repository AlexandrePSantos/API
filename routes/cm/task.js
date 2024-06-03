const taskRouter = require('express').Router();
const controller = require('../../controllers/cm/task');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
taskRouter.use(authMiddleware);

//task CRUD
taskRouter.get('/', controller.getAll); //read all
taskRouter.get('/:idTask', controller.getById); //read one by his id
taskRouter.post('/create', controller.create); //create new task
taskRouter.put('/update/:idTask', controller.update); //update task
taskRouter.delete('/delete/:idTask', controller.delete); //delete task

// novas rotas para tarefas
taskRouter.get('/:idTask/users', controller.getUsers);
taskRouter.post('/:idTask/assignUser/:idUser', controller.assignUser);
taskRouter.delete('/:idTask/removeUser/:idUser', controller.removeUser);
taskRouter.put('/:idTask/complete', controller.completeTask);
taskRouter.put('/:idTask/state', controller.setState);

module.exports = taskRouter;