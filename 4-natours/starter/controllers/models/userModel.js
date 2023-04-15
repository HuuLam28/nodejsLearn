const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: string,
        required: true
    },
    email: {
        type: string,
        required: true
    },
    photo: {
        type: string,
    },
    password: {
        type: string,
        required: true

    },
    passwordConfirm: {
        type: string,
        required: true
    },
});

const User = mongoose.model('User', userSchema )

module.exports = User;