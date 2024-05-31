const authTokenRouter = require('express').Router();
const controller = require('../../controllers/cm/authToken');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
authTokenRouter.use(authMiddleware);

//authToken CRUD
authTokenRouter.get('/', controller.getAll); //read all
authTokenRouter.get('/:idToken', controller.getById); //read one by his id
authTokenRouter.post('/create', controller.create); //create new authToken
authTokenRouter.put('/update', controller.update); //update authToken
authTokenRouter.delete('/delete/:idToken', controller.delete); //delete authToken

module.exports = authTokenRouter;