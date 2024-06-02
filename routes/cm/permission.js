const permissionRouter = require('express').Router();
const controller = require('../../controllers/cm/permission');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
permissionRouter.use(authMiddleware);

//permission CRUD
permissionRouter.get('/', controller.getAll); //read all
permissionRouter.get('/:idPermission', controller.getById); //read one by his id
permissionRouter.post('/create', controller.create); //create new permission
permissionRouter.put('/update/:idPermission', controller.update); //update permission
permissionRouter.delete('/delete/:idPermission', controller.delete); //delete permission

module.exports = permissionRouter;