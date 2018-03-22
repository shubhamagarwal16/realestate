const mongoose = require('mongoose');
var state_model = require('../models/state');
var city_model = require('../models/city');



module.exports = {
    // STATES
    getStateList: (req, res) => {
        state_model.find((err, data) => {
            if(err)
                res.send(err);
            res.send(data);
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
                res.send(err);
            res.json(data);
        });
    },
    addCity: (req, res) => {
        var city = new city_model();
        city.name = req.body.name;
        city.state_id = req.body.state_id;        
        
        city.save((err) => {
            if(err)
                res.send(err);
            res.json({ message: 'city added successfully' });
        })
    },

} 