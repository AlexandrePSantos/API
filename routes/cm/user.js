const userRouter = require('express').Router();
const controller = require('../../controllers/cm/user');

//user CRUD
userRouter.get('/', controller.getAll); //read all
userRouter.get('/:idToken', controller.getById); //read one by his id
userRouter.post('/create', controller.create); //create new user
userRouter.put('/update', controller.update); //update user
userRouter.delete('/delete/:idToken', controller.delete); //delete user

module.exports = userRouter;