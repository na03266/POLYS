const express = require('express');
const router = express.Router();
const loginAttendController = require('../controllers/loginAttendController');


router.post('/', loginAttendController.loginAttend);

module.exports = router;