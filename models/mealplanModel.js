const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    dateRange: {
      start: Date,
      end: Date
    },
    meals: [{
      recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
      date: Date,
      servings: Number
    }]
  }, { collection: 'mealplan' }); // Explicitly define the collection name
  
  const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

  module.exports = MealPlan;