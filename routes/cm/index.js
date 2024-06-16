const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/project', require('./project'));
router.use('/syncLog', require('./syncLog'));
router.use('/task', require('./task'));
router.use('/user', require('./user'));
router.use('/userType', require('./userType'));
router.use('/stats', require('./stats'));
router.use('/obs', require('./obs'));
router.use('/usertask', require('./usertask'));
router.use('/state', require('./state'));
router.use('/performance', require('./performance'));

module.exports = router;