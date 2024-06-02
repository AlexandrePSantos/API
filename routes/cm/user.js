const userRouter = require('express').Router();
const controller = require('../../controllers/cm/user');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
// userRouter.use(authMiddleware);

//user CRUD
userRouter.get('/', controller.getAll); //read all
userRouter.get('/:idUser', controller.getById); //read one by his id
userRouter.post('/create', controller.create); //create new user
userRouter.put('/update/:id', controller.update); //update user
userRouter.delete('/delete/:idUser', controller.delete); //delete user

module.exports = userRouter;