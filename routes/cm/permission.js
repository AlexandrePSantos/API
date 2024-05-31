const permissionRouter = require('express').Router();
const controller = require('../../controllers/cm/permission');

//permission CRUD
permissionRouter.get('/', controller.getAll); //read all
permissionRouter.get('/:idToken', controller.getById); //read one by his id
permissionRouter.post('/create', controller.create); //create new permission
permissionRouter.put('/update', controller.update); //update permission
permissionRouter.delete('/delete/:idToken', controller.delete); //delete permission

module.exports = permissionRouter;