const mongoose = require('mongoose');
const moment = require('moment');
const fs = require('fs');
var Grid  = require('gridfs-stream');

const helpers = require('../providers/helper');
var propertyType = require('../models/propertyTypes');
var Property = require('../models/property');

var gfs;
var conn = mongoose.connection;
conn.on('connected', () => { 
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('imageMeta');
 });

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
            if(req.files && req.files.length)
                req.files.forEach(ele => imgs.push(ele.filename) )
            //Creating slug for the listing 
            var slug  = await helpers.slugGenerator(req.body.title, 'title', 'property');
            req.body.slug = slug;
            req.body.type = req.body.Proptype;
            req.body.cornrPlot = req.body.cornrPlot ? true : false;
            req.body.images = imgs;      
            req.body.imgPath = 'properties';
            if(!req.body.isSociety){
                req.body.flatNo = '';
                req.body.societyName = '';
            }            
            const prop = new Property(req.body);
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
            var result  = await Property.findOne({ slug: req.params.propertySlug })
                .populate('city', 'name')
                .populate('state', 'name')
                .populate('type', 'title');
                
            var files = [];
            if(result && result.images.length){
                files = await gfs.files.find({ filename: { $in : result.images } }).toArray();
            }
            if(result) res.status(200).json({result, files});
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
    },
    showGFSImage: (req, res) => {
        gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
          // Check if file
          if (!file || file.length === 0) {
            return res.status(404).json({
              err: 'No file exists'
            });
          }
      
          // Check if image
          if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
          } else {
            res.status(404).json({
              err: 'Not an image'
            });
          }
        }) 
    }
}