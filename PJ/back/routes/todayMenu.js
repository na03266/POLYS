const express = require('express');
const router = express.Router();
const todayMenuController = require('../controllers/todayMenuController');


router.get('/', todayMenuController.todayMenu);

module.exports = router;