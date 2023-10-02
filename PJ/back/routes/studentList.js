const express = require('express');
const router = express.Router();
const studentListController = require('../controllers/studentListController');


router.get('/', studentListController.studentList);

module.exports = router;