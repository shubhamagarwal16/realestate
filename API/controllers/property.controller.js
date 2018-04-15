const mongoose = require('mongoose');
const moment = require('moment');

var propertyType = require('../models/propertyTypes');
var Property = require('../models/property');

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
    },
    addNewProperty: (req, res) => {
        // res.status(200).send(req.body.userId);
        var property = new Property();

        property.title = req.body.title;
        property.description = req.body.description;
        property.type = req.body.type;
        property.propertyFor = 'sell'; //req.body.for;
        property.state = req.body.state;
        property.city = req.body.city;
        property.locality = req.body.locality;
        property.address = req.body.address;
        property.email = req.body.email;
        property.phoneNo = req.body.phoneNo;
        property.pincode = req.body.pincode;
        property.userId = req.body.userId;
        property.createdOn = Date.now();

        property.save((err, result) => {
            if(err)
                res.status(400).send(err);
            else
                res.status(200).json({ message: 'Property posted successfully', id: result._id });
        })
    },
    getUserList: (req, res) => {
        Property.find({ isActive: true, userId: req.params.userId })
        .populate('city', 'name')
        .populate('state', 'name')
        .populate('type', 'title')
        .exec((err, result) => {
            if (err)
                res.status(400).send(err);
            else
                res.status(200).json(result);
        });
    },
    getSingleProperty: (req, res) => {
        Property.findOne({ _id: req.params.propertyId })
        .populate('city', 'name')
        .populate('state', 'name')
        .populate('type', 'title')
        .exec((err, result) => {
            if (err)
                res.status(400).send(err);
            else
                res.status(200).json(result);
        });
    },
    getFullList: (req, res) => {
        Property.find({ isActive: true })
            .populate('city', 'name')
            .populate('state', 'name')
            .populate('type', 'title')
            .populate('userId', 'name')
            .exec((err, result) => {
            if (err)
                res.status(400).send(err);
            else
                res.status(200).json(result);
        });
    },
    filterProperties: (req, res) => {
        // console.log('propertyFor ', req.query.propertyFor, typeof req.query.propertyFor);
        // console.log(req.query.propertyFor.split(","));        
        var query = {};
        // query['isActive'] = true;

        if (req.query.propertyFor)
            query['propertyFor'] = { $in: req.query.propertyFor.split(",") }
        if (req.query.type)
            query['type'] = { $in: req.query.type.split(",") }
        if (req.query.city)
            query['city'] = { $in: req.query.city.split(",") }
        if (req.query.userId)
            query['userId'] = req.query.userId
        if (req.query.status)
            query['status'] = { $in: req.query.status.split(",") }
            
        Property.find(query)
            .populate('city', 'name')
            .populate('state', 'name')
            .populate('type', 'title')
            .populate('userId', 'name')
        .exec((err, result) => {
            if (err)
                res.status(400).send(err);
            else
                res.status(200).json(result);                
        });
    },
}
