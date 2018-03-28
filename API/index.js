const express = require('express');
var app = express();
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const morgan = require('morgan');
// Routing
var indexR = require('./routes/indexR'); 
var users = require('./routes/users');
var auth = require('./routes/auth');
var common = require('./routes/common');
var property = require('./routes/property');

// Connect with DB

// --- local
// mongoose.connect('mongodb://localhost/realEstatedb');

// ----- mLab
mongoose.connect('mongodb://realEstate:realEstate@ds227119.mlab.com:27119/realestate-node');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to dB');  
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));
//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes
// app.use('/api', indexR);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/common', common);
app.use('/api/property', property);

 //console.log(process.env.PORT); //.PORT, ' -port');

// var tokenn = require('./config/config').secretKey;

// console.log('token ', tokenn);



var port =  process.env.PORT || 8080;

app.listen(port, () => {
    console.log('Listening @', port);    
});
