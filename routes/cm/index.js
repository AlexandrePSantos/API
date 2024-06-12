const router = require('express').Router();
const projectRouter = require('./project');
const taskRouter = require('./task');   
const userRouter = require('./user');
const userTypeRouter = require('./userType');
const authRouter = require('./auth');
const statsRouter = require('./stats');
const syncLogRouter = require('./syncLog');
const obsRouter = require('./obs');
const usertaskRouter = require('./usertask');
const stateRouter = require('./state');

router.use('/auth', authRouter);
router.use('/project', projectRouter);
router.use('/syncLog', syncLogRouter);
router.use('/task', taskRouter);
router.use('/user', userRouter);
router.use('/userType', userTypeRouter);
router.use('/stats', statsRouter);
router.use('/obs', obsRouter);
router.use('/usertask', usertaskRouter);
router.use('/state', stateRouter);

module.exports = router;