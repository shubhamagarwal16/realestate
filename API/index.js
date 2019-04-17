const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./config/config');
var app = express();

const startupdebug = require('debug')('app:startup');

app.use(express.static(path.join(__dirname, 'uploads')));

// Routing
var users = require('./routes/users');
var auth = require('./routes/auth');
var common = require('./routes/common');
var property = require('./routes/property');

// Connect with DB
// --- local     // mongoose.connect('mongodb://localhost/realEstatedb');

// ----- mLab
mongoose.connect(config.dbUrl, {useNewUrlParser: true})
.then((conn) => // we're connected!
{
  startupdebug('connected to dB');
})
.catch(err => console.error('Connection Error', err));


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));
//CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT'); //,DELETE,OPTIONS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Routes
app.use('/api/user', users);
app.use('/api/auth', auth);
app.use('/api/common', common);
app.use('/api/property', property);

//console.log(process.env.PORT); //.PORT, ' -port');
// var tokenn = require('./config/config').secretKey;
// console.log('token ', tokenn);

var port =  process.env.PORT || 8080;

app.listen(port, () => {
  startupdebug('Listening @', port);    
});
