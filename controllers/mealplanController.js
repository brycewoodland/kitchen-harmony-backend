const MealPlan = require('../models/mealplanModel');

/**
 * @function getAllMealPlans
 * @description Gets all meal plans from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const getAllMealPlans = async (req, res) => {
    try {
        const mealPlans = await MealPlan.find({});
        res.status(200).json(mealPlans);
    } catch (err) {
        console.error('Error fetching meal plans:', err);
        res.status(500).json({ message: err.message });
    }
};

/**
 * @function getMealPlanById
 * @description Gets a single meal plan by id from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const getMealPlanById = async (req, res) => {
    try {
        const mealPlan = await MealPlan.findById(req.params.id);
        
        if (!mealPlan) return res.status(404).json({ message: 'Meal plan not found' });
        res.json(mealPlan);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * @function createMealPlan
 * @description Creates a new meal plan.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const createMealPlan = async (req, res) => {
    const mealPlan = new MealPlan({
        name: req.body.name,
        description: req.body.description,
        meals: req.body.meals, // Array of meal items
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        userId: req.body.userId
    });

    try {
        const newMealPlan = await mealPlan.save();
        res.status(201).json({ message: newMealPlan._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * @function updateMealPlan
 * @description Updates a meal plan by its id.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const updateMealPlan = async (req, res) => {
    try {
        const mealPlan = await MealPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found.' });
        }
        res.json({ message: 'Mealplan updated successfully!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * @function deleteMealPlan
 * @description Deletes a meal plan by its id.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const deleteMealPlan = async (req, res) => {
    try {
        const mealPlan = await MealPlan.findByIdAndDelete(req.params.id);
        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found.' });
        }
        res.json({ message: 'Mealplan deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllMealPlans,
    getMealPlanById,
    createMealPlan,
    updateMealPlan,
    deleteMealPlan
};
