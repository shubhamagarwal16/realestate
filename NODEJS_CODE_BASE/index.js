const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv')
dotenv.config();

var app = express();
const config = require('./config/config');
const startupdebug = require('debug')('app:startup');

app.use(express.static(path.join(__dirname, 'uploads')));

// Routing
var users = require('./routes/users');
var auth = require('./routes/auth');
var common = require('./routes/common');
var property = require('./routes/property');
var email = require('./routes/email');

// Connect with DB 
const DB_URL = process.env.MLAB_DB_URL || config.localDB
console.log(DB_URL)
mongoose.connect(DB_URL, { useNewUrlParser: true })
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
app.use(function (req, res, next) {
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
app.use('/api/email', email);

var port = process.env.PORT || 8080;

app.listen(port, () => {
  startupdebug('Listening @', port);
});
