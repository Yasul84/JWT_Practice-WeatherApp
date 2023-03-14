const mongoose = require('mongoose');

// User Model
const userModel = mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please, enter your name into the name field.']
    }, 
    email: {
        type: String, 
        required: [true, 'Please, enter a valid email address into the field.']
    }, 
    password: {
        type: String, 
        required: [true, 'Please, enter your password into the field.']
    }
}, {timestamps: true});

module.exports = mongoose.model('users', userModel);