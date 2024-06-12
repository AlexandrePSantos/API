const express = require('express');
const router = express.Router();
const controller = require('../../controllers/cm/usertask');

router.post('/create', controller.createUserTask);
router.get('/', controller.getUserTasks);

module.exports = router;