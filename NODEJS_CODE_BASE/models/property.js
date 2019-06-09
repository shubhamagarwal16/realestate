var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const propertySchema = mongoose.model('property', new mongoose.Schema({
    title: {
        type: String,
        trim: true,
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
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    breadth: {
        type: Number,
        required: true
    },
    cornrPlot: {
        type: Boolean,
        default: false,
        enum: [true, false]
    },
    isSociety: {
        type: Boolean,
        default: false,
        enum: [true, false]
    },
    societyName: {
        type: String,
        required: function(){ return this.isSociety; }
    },
    flatNo: {
        type: String,
        required: function(){ return this.isSociety; }
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    phoneNo: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
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
    images: {
        type: [String]
    },
    imgPath: {
        type: String
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
}) );

module.exports = propertySchema;