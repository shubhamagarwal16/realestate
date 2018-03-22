const express = require('express');

var app = express();

var authC  =require('../controllers/auth.controller');

var router = express.Router();

router.post('/user/login', authC.userLogin);
//registration
router.post('/user/register', authC.userRegistration);

// console.log(app);

module.exports = router;
