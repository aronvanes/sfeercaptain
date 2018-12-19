var mongoose = require('mongoose');
var expressvalidator = require('express-validator');
var bcrypt   = require('bcrypt-nodejs');

var userDataSchema = new mongoose.Schema({
    normal: {
    naam: {type: String, required: true},
    email: {type: String, required: true},
    age: {type: String, required: true}
},
    admin:
        {
            name:{type: String},
            pass:{type: String}
        }
},{collection: 'userData'});


module.exports = mongoose.model('User', userDataSchema);