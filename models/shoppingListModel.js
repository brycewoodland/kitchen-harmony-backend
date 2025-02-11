const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  items: [{
    name: String,
    quantity: String,
    unit: String,
  }],
  userId: {
    type: String,  
    required: true,  
  }
}, { collection: 'shoppingLists' }); 

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);

module.exports = ShoppingList;
