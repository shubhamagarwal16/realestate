const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

var app = express();
const config = require('./config/config');
const startupdebug = require('debug')('app:startup');
const errordebug = require('debug')('app:error');

app.use(express.static(path.join(__dirname, 'uploads')));

// Routing
const users = require('./routes/users');
const auth = require('./routes/auth');
const common = require('./routes/common');
const property = require('./routes/property');
const email = require('./routes/email');

// Connect with DB 
const DB_URL = process.env.MLAB_DB_URL || config.localDB

async function connectDB() {
  await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { // we're connected!
      startupdebug('connected to dB');
    })
    .catch(err => {
      errordebug("DB_URL - ", DB_URL);
      errordebug('Connection Error', err);
    });
}

connectDB();

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

app.get('/', (req, res) => {
  const welcomeText = "<div style='text-align: center;'><h1>Welcome to Relestate.</h1><p>Server is up and running, visit <a href='https://github.com/shubhamagarwal16/realestate'>link</a> for more info.</p></div>";
  res.status(200).send(welcomeText);
})

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