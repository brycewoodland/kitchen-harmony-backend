const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  meals: { type: Array, default: [] },
  startDate: { type: Date },
  endDate: { type: Date },
  auth0Id: { type: String, required: true },
})

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;
