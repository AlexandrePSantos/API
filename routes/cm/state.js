const stateRouter = require('express').Router();
const controller = require('../../controllers/cm/state');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
stateRouter.use(authMiddleware);

//state CRUD
stateRouter.get('/', controller.getAll); //read all
stateRouter.get('/:idState', controller.getById); //read one by his id
stateRouter.post('/create', controller.create); //create new state
stateRouter.put('/update/:idState', controller.update); //update state
stateRouter.delete('/delete/:idState', controller.delete); //delete state

module.exports = stateRouter;