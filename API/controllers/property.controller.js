const mongoose = require('mongoose');
const moment = require('moment');
const helpers = require('../providers/helper');

var propertyType = require('../models/propertyTypes');
var Property = require('../models/property');

module.exports = {
    propertyTypeList: (req, res) => {
        propertyType.find({ is_active: true }, (err, result) => {
            if (err)
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
            if (err)
                res.status(400).send(err);
            else
                res.status(200).json({ message: 'Property type added successfully', id: result._id });
        });
    },
    addNewProperty: async (req, res) => {
        let imgs = [];        
        try{
            if(req.files.length)
                req.files.forEach(ele => imgs.push(ele.filename) )
            //Creating slug for the listing 
            var slug  = await helpers.slugGenerator(req.body.title, 'title', 'property');
            req.body.slug = slug;
            req.body.type = req.body.Proptype;
            req.body.images = imgs;      
            req.body.imgPath = 'properties';
            if(!req.body.isSociety){
                req.body.flatNo = '';
                req.body.societyName = '';
            }

            var prop = new Property(req.body);
            const result = await prop.save();

            if(result && result._id && result.slug)
                res.status(200).json({result, message: "Your property has been successfully posted"});                
            else throw new Error('Something Went Wrong');
        }
        catch(err){
            console.log({err});
            res.status(400).json({message: err.message});
        }
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
    getSingleProperty: async (req, res) => {
        try{
            const result  = await Property.findOne({ slug: req.params.propertySlug })
                .populate('city', 'name')
                .populate('state', 'name')
                .populate('type', 'title');
            
            if(result) res.status(200).json({result});
            else throw new Error('Something Went Wrong');
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
        
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
    markAsSold: async (req, res) => {
        try{
            const result = await Property.update({ slug: req.params.propertySlug }, { status: req.body.status });
            console.log({result});
            if(result && result.nModified == 1) res.status(200).json({ result, message: "Property has been updated Successfully" });
            else throw new Error('Error in updating property');
        }
        catch(err){
            res.status(400).json({message: err.message});
        }
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
        if (req.query.notUserId)
            query['userId'] = { $ne: req.query.notUserId }
        if (req.query.status)
            query['status'] = { $in: req.query.status.split(",") }
        console.log({ query });
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
    testController: async (req, res) => {
        // console.log({testData});
        const testData = await Property.find({ updatedOn: { $gte : '2019-04-01' } })
        console.log({ testData });
        return res.send(testData);
    }
}