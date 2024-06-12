const express = require('express');
const router = express.Router();
const { createUserTask, getUserTasks } = require('./controllers/userTaskController');

router.post('/create', createUserTask);
router.get('/', getUserTasks);

module.exports = router;