const syncLogRouter = require('express').Router();
const controller = require('../../controllers/cm/syncLog');

//syncLog CRUD
syncLogRouter.get('/', controller.getAll); //read all
syncLogRouter.get('/:idToken', controller.getById); //read one by his id
syncLogRouter.post('/create', controller.create); //create new syncLog
syncLogRouter.put('/update', controller.update); //update syncLog
syncLogRouter.delete('/delete/:idToken', controller.delete); //delete syncLog

module.exports = syncLogRouter;