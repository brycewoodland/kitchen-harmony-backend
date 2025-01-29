const mongoose = require('mongoose');

const mealplanSchema = new mongoose.Schema({
 userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
 },
 name: {
    type: String,
    required: true
 },
 dateRange: {
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    }
 },
 meals: [{
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    servings: {
        type: Number,
        required: true
    }
 }]
 });

const Mealplan = mongoose.model('Mealplan', mealplanSchema);

module.exports = Mealplan;