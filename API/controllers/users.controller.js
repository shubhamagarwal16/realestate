const mongoose = require('mongoose');
var users = require('../models/users');
var states = require('../models/state');

module.exports = {
    getUserDetails: (req, res) => {
        users.findOne({ _id: '5ab35564c56dc04cd9768900' })
            .populate('city', 'name')
            .populate('state', 'name')
            .exec((err, result) => {
                if(err)
                    res.status(400).send(err);
                else{
                    // result[0].state = states.name;
                    res.status(200).send(result);
                }
            });
    }
}