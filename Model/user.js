var mongoose = require('mongoose');


var Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    LastName: {
        type: String,
        default: ''
    },
    phone: {
        phone: String,
    }
});

var user = new mongoose.model('User', schema);

module.exports = user;