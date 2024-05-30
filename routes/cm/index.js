const router = require('express').Router();
const authRouter = require('./auth');
const studentRouter = require('./students');

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