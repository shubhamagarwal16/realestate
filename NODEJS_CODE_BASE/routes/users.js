const express = require('express');

var app = express();
var userController = require('../controllers/users.controller');

var router = express.Router();

router.get('/:userId', userController.getUserDetails);

module.exports = router;
