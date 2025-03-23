const mongoose = require('mongoose');
require('./recipeModel');

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 3 }
});

const Counter = mongoose.model('Counter', counterSchema);

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    recipes: [{
        type: String,
    }],
    id: { type: String },
    auth0Id: { type: String, unique: true }
});

const User = mongoose.model('User', userSchema);

module.exports = { User, Counter };