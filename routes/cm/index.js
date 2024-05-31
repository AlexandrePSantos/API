const router = require('express').Router();
const authTokenRouter = require('./authToken');
const localBackupRouter = require('./localBackup'); 
const permissionRouter = require('./permission');
const projectRouter = require('./project');
const stateRouter = require('./state');
const syncLogRouter = require('./syncLog');
const taskRouter = require('./task');   
const userRouter = require('./user');
const userTypeRouter = require('./userType');

router.use('/authToken', authTokenRouter);
router.use('/localBackup', localBackupRouter);
router.use('/permission', permissionRouter);
router.use('/project', projectRouter);
router.use('/state', stateRouter);
router.use('/syncLog', syncLogRouter);
router.use('/task', taskRouter);
router.use('/user', userRouter);
router.use('/userType', userTypeRouter);

module.exports = router;