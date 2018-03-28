const express = require('express');

var app = express();
var propertyController = require('../controllers/property.controller');

var router = express.Router();

// Property type
router.get('/propertyType-list', propertyController.propertyTypeList);
router.post('/addPropertyType', propertyController.addPropertyType);

module.exports = router;
