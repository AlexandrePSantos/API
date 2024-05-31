const userTypeRouter = require('express').Router();
const controller = require('../../controllers/cm/userType');

//userType CRUD
userTypeRouter.get('/', controller.getAll); //read all
userTypeRouter.get('/:idToken', controller.getById); //read one by his id
userTypeRouter.post('/create', controller.create); //create new userType
userTypeRouter.put('/update', controller.update); //update userType
userTypeRouter.delete('/delete/:idToken', controller.delete); //delete userType

module.exports = userTypeRouter;