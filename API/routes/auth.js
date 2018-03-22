const express = require('express');

var app = express();

var router = express.Router();

router.post('/user/login', (req, res) => {
    // console.log('user auth login');    
    res.json({ message: 'user auth login' });
});
//registration
router.post('/user/register', (req, res) =>    {
    // console.log('user auth register');  
    res.json({ message: 'user auth register' });
});

// console.log(app);

module.exports = router;
