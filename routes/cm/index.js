const router = require('express').Router();
const projectRouter = require('./project');
const stateRouter = require('./state');
const taskRouter = require('./task');   
const userRouter = require('./user');
const userTypeRouter = require('./userType');
const authRouter = require('./auth');
const statsRouter = require('./stats');

router.use('/auth', authRouter);
router.use('/project', projectRouter);
router.use('/state', stateRouter);
router.use('/syncLog', syncLogRouter);
router.use('/task', taskRouter);
router.use('/user', userRouter);
router.use('/userType', userTypeRouter);
router.use('/stats', statsRouter);

module.exports = router;