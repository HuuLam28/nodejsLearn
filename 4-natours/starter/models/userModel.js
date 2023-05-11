const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: true, 
        unique: [true, 'Please provide your email address'], // Trường này là duy nhẩt
        lowercase: true,
        validate: [validator.isEmail,  'Please provide a valid email address'],
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 8

    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please provide your Confirm password'],
        validate: function(el) {
            return el === this.password
        },
        message: 'Passwords do not the same'
    },
});

const User = mongoose.model('User', userSchema )

module.exports = User;