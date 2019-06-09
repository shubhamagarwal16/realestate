var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNo: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: Schema.Types.ObjectId,
        ref: 'States'
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City'
    },
    pincode: {
        type: Number
    },
    userType: {
        type: Number,
        default: 1
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
    createdOn: {
        type: Date
    }
});

module.exports = mongoose.model('users', userSchema);