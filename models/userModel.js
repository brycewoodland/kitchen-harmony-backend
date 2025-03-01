const mongoose = require('mongoose');
require('./recipeModel');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    recipes: [{
        type: String,
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;