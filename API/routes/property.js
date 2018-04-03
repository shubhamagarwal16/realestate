const express = require('express');

var app = express();
var propertyController = require('../controllers/property.controller');

var router = express.Router();

// Property type
router.get('/type', propertyController.propertyTypeList);
router.post('/type', propertyController.addPropertyType);

//Property
router.post('/new', propertyController.addNewProperty);
router.get('/list/:userId', propertyController.getUserList);
router.get('/list/', propertyController.getFullList);

//filter
router.post('/filter', propertyController.filterProperties);
// router.get('/filter/propertyFor/:propertyFor/type/:type/city/:city', propertyController.filterProperties);

module.exports = router;
