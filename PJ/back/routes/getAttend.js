const express = require('express');
const router = express.Router();
const getAttendController = require('../controllers/getAttendController');


router.get('/', getAttendController.getAttend);

module.exports = router;