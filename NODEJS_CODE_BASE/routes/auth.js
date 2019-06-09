const express = require('express');

var app = express();

var authC  =require('../controllers/auth.controller');

var router = express.Router();

router.post('/user/login', authC.userLogin);
//registration
router.post('/user/register', authC.userRegistration);

//admin
router.get('/admin/userList', authC.userList)
router.put('/admin/changePass', authC.changePass)

// console.log(app);

module.exports = router;
