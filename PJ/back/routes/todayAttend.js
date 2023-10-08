const express = require('express');
const router = express.Router();
const todayAttendController = require('../controllers/todayAttendController');


router.get('/', todayAttendController.todayAttend);

module.exports = router;