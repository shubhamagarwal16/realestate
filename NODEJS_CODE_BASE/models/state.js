var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var stateSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('States', stateSchema);