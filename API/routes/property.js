const express = require('express');
var propertyController = require('../controllers/property.controller');
var router = express.Router();
var multer  = require('multer');
const helpers = require('../providers/helper');

// var upload = multer({ dest: 'uploads/' })
var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
var upload = multer({ storage: storage });

router.use((req, res, next) => {
    console.log(req.originalUrl,' query param: ', req.query);
    next();
})

// Property type
router.get('/type', propertyController.propertyTypeList);
router.post('/type', propertyController.addPropertyType);

//Property
router.post('/new', upload.array("propImages"), propertyController.addNewProperty);
router.get('/list/:userId', propertyController.getUserList);
router.get('/list/', propertyController.getFullList);
router.get('/single/:propertyId', propertyController.getSingleProperty);
router.post('/markAsSold/:propertyId', propertyController.markAsSold);

router.get('/slugslug', (req, res) => {
    var slug  = helpers.slugGenerator('Property 1', 'title', 'property');
    slug.then((result2) => {
        console.log({result2});
        res.send('sdfsf'+ result2);
    })
    console.log('------------');
}); 

router.get('/testtest2', propertyController.testController);
router.get('/testtest1', (req, res) => {
    async function f1(){
        var propertyType = require('../models/propertyTypes');
        var sada = await propertyType.find();
        console.log('sada ', sada);
        // await f2();
        // res.send('async await');
    }
    // function f2(){
    //     new Promise(() => {
    //         setTimeout(() => console.log('f2'), 3000 );
    //     })
    //     console.log('async await');
    // }
    f1();
   

});
//filter
router.get('/filter', propertyController.filterProperties);
// router.get('/filter/propertyFor/:propertyFor/type/:type/city/:city', propertyController.filterProperties);

module.exports = router;
