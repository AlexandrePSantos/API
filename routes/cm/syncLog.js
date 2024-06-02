const syncLogRouter = require('express').Router();
const controller = require('../../controllers/cm/syncLog');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
syncLogRouter.use(authMiddleware);

//syncLog CRUD
syncLogRouter.get('/', controller.getAll); //read all
syncLogRouter.get('/:idLog', controller.getById); //read one by his id
syncLogRouter.post('/create', controller.create); //create new syncLog
syncLogRouter.put('/update/:idLog', controller.update); //update syncLog
syncLogRouter.delete('/delete/:idLog', controller.delete); //delete syncLog

module.exports = syncLogRouter;