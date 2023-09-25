const express = require('express');
const router = express.Router();
const adminLoginController = require('../controllers/adminLoginController');


router.post('/', adminLoginController.adminLogin);

module.exports = router;