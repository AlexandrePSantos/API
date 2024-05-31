const stateRouter = require('express').Router();
const controller = require('../../controllers/cm/state');

//state CRUD
stateRouter.get('/', controller.getAll); //read all
stateRouter.get('/:idToken', controller.getById); //read one by his id
stateRouter.post('/create', controller.create); //create new state
stateRouter.put('/update', controller.update); //update state
stateRouter.delete('/delete/:idToken', controller.delete); //delete state

module.exports = stateRouter;