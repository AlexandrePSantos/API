const syncLogRouter = require('express').Router();
const controller = require('../../controllers/cm/syncLog');
const authMiddleware = require('../../middlewares/auth');

//use auth middleware
syncLogRouter.use(authMiddleware);

//syncLog CRUD
syncLogRouter.get('/', controller.getAll); //read all
syncLogRouter.get('/:idlog', controller.getById); //read one by his id
syncLogRouter.post('/create', controller.create); //create new syncLog
syncLogRouter.put('/update/:idlog', controller.update); //update syncLog
syncLogRouter.delete('/delete/:idlog', controller.delete); //delete syncLog

module.exports = syncLogRouter;