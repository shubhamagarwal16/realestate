const mongoose = require('mongoose');

var propertyType = require('../models/propertyTypes');
var property = require('../models/property');

module.exports = {
    propertyTypeList: (req, res) => {
        propertyType.find({ is_active: true }, (err, result) => {
            if(err)
                res.status(400).send(err);
            else    
                res.status(200).json(result);
        });
    },
    addPropertyType: (req, res) => {
        var proptyp = new propertyType();

        proptyp.title = req.body.title;
        proptyp.type = req.body.type;
        proptyp.createdOn = Date.now();

        proptyp.save((err, result) => {
            if(err)
                res.status(400).send(err);
            else    
                res.status(200).json({ message: 'Property type added successfully', id: result._id });
        });
    }
}
