const express = require('express');
var app = express();

var commonController = require('../controllers/common.controller');

var router = express.Router();

// States
router.route('/state')
.get(commonController.getStateList)
.post(commonController.addState)

//Cities
router.get('/cities/:state_id', commonController.getCityList)
.post('/cities', commonController.addCity)

module.exports = router;