const mongoose = require('mongoose');
var state_model = require('../models/state');
var city_model = require('../models/city');
var users = require('../models/users');



module.exports = {
    // STATES
    getStateList: (req, res) => {
        console.log('GET statelist');
        
        state_model.find((err, data) => {
            if(err)
                res.status(400).send(err);
            res.status(200).send(data);
        });
    },
    addState: (req, res) => {
        var state = new state_model();
        state.name = req.body.name;
        
        state.save((err) => {
            if(err)
                res.send(err);
            res.json({ message: 'State added successfully' });
        })
    },
    //CITIES
    getCityList: (req, res) => {
        city_model.find({ state_id: req.params.state_id }, (err, data) => {
            if(err)
                res.status(400).send(err);
            res.status(200).json(data);
        });
    },
    addCity: (req, res) => {
        var city = new city_model();
        city.name = req.body.name;
        city.state_id = req.body.state_id;        
        
        city.save((err) => {
            if(err)
                res.send(err);
            res.status(400).json({ message: 'city added successfully' });
        })
    },
    checkemailAvailability: (req, res) => {
        // res.send(req.params.email);
        var email = req.params.email;

        users.find({email: email}, (err, result) => {
            if(err)
                res.status(400).send(err);
            else if(result.length > 0)
                res.status(200).json({  response: true});
            else
                res.status(200).json({  response: false});
        });

    }

} 