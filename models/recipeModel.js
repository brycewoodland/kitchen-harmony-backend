const mongoose = require('mongoose');

const recipesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    ingredients: {
        type: [String],
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
        required: true
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Recipe = mongoose.model('Recipe', recipesSchema);

module.exports = Recipe;