const userRouter = require('express').Router();
const controller = require('../../controllers/cm/user');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
// userRouter.use(authMiddleware);

//user CRUD
userRouter.get('/', controller.getAll); //read all
userRouter.get('/:iduser', controller.getById); //read one by his id
userRouter.post('/create', controller.create); //create new user
userRouter.put('/update/:iduser', controller.update); //update user
userRouter.delete('/delete/:iduser', controller.delete); //delete user

module.exports = userRouter;