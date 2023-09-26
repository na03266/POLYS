const express = require('express');
const router = express.Router();
const registController = require('../controllers/registController.js');


router.post('/', registController.regist);

module.exports = router;