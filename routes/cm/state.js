const stateRouter = require('express').Router();
const controller = require('../../controllers/cm/state');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
stateRouter.use(authMiddleware);

//state CRUD
stateRouter.get('/', controller.getAll); //read all
stateRouter.get('/:idstate', controller.getById); //read one by his id
stateRouter.post('/create', controller.create); //create new state
stateRouter.put('/update/:idstate', controller.update); //update state
stateRouter.delete('/delete/:idstate', controller.delete); //delete state

module.exports = stateRouter;