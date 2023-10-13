const express = require('express');
const router = express.Router();
const guestLoginController = require('../controllers/guestLoginController');


router.post('/', guestLoginController.guestLogin);

module.exports = router;