const userTypeRouter = require('express').Router();
const controller = require('../../controllers/cm/userType');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
// userTypeRouter.use(authMiddleware);

//userType CRUD
userTypeRouter.get('/', controller.getAll); //read all
userTypeRouter.get('/:idType', controller.getById); //read one by his id
userTypeRouter.post('/create', controller.create); //create new userType
userTypeRouter.put('/update/:idType', controller.update); //update userType
userTypeRouter.delete('/delete/:idType', controller.delete); //delete userType

module.exports = userTypeRouter;