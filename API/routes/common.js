const express = require('express');
var app = express();

var commonController = require('../controllers/common.controller');

var router = express.Router();

// router.use('/state', (req, res, next) => {
//     console.log('Request URL:', req.originalUrl); 
//     console.log('Request URL:', req.headers); 
//     if(req.headers.test === 'dat')
//         next();   
//     else
//         next('/err');
// });

// States
router.route('/state')
.get(commonController.getStateList)
.post(commonController.addState)

//Cities
router.get('/cities/:state_id', commonController.getCityList)
.post('/cities', commonController.addCity)

router.delete('/city/:cityId', commonController.removeCity)

//checkemail-availability
router.get('/checkemail-availability/email/:email', commonController.checkemailAvailability)

// router.use('/err', function (err, req, res, next) {
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
// })

module.exports = router;