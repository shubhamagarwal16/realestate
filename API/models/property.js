var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const propertySchema = mongoose.model('property', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    propertyFor: {
        type: String,
        required: true,
        default: 'sell',
        enum: ['sell', 'rent']
    },
    description: {
        type: String
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'propertyTypes'
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'States'
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    },
    locality: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    phoneNo: {
        type: String
    },
    pincode: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        default: 'available', 
        enum: [ 'available', 'sold', 'rented', 'expired' ]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    slug : {
        type: String,
        required: true
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
    createdOn: {
        type: Date
    }
}) );

module.exports = propertySchema;