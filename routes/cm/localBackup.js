const localBackupRouter = require('express').Router();
const controller = require('../../controllers/cm/localBackup');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
localBackupRouter.use(authMiddleware);

//localBackup CRUD
localBackupRouter.get('/', controller.getAll); //read all
localBackupRouter.get('/:idBackup', controller.getById); //read one by his id
localBackupRouter.post('/create', controller.create); //create new localBackup
localBackupRouter.put('/update/:idBackup', controller.update); //update localBackup
localBackupRouter.delete('/delete/:idBackup', controller.delete); //delete localBackup

module.exports = localBackupRouter;