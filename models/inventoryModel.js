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
    },
    expirationDate: {
        type: Date,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const inventorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ingredients: {
        type: [ingredientSchema],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'inventory' });

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;