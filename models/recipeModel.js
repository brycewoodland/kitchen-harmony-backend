const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
});

const recipesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    ingredients: {
        type: [ingredientSchema],
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    imageUrl: {
        type: String
    },
    userId: {
        type: String,
        required: true
    }
})

const Recipe = mongoose.model('Recipe', recipesSchema);

module.exports = Recipe;