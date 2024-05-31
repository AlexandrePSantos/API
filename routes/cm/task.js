const taskRouter = require('express').Router();
const controller = require('../../controllers/cm/task');

//task CRUD
taskRouter.get('/', controller.getAll); //read all
taskRouter.get('/:idToken', controller.getById); //read one by his id
taskRouter.post('/create', controller.create); //create new task
taskRouter.put('/update', controller.update); //update task
taskRouter.delete('/delete/:idToken', controller.delete); //delete task

module.exports = taskRouter;