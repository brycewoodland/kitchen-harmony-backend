const MealPlan = require('../models/mealplanModel');
const mongoose = require('mongoose');

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
 * @function getMealPlanByUserId
 * @description Gets meal plans by user ID from the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const getMealPlanByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const authenticatedUserId = req.oidc.user.sub;

        // Verify that the requested userId matches the authenticated user ID
        if (userId !== authenticatedUserId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Convert the userId string to an ObjectId
        const userIdObjectId = new mongoose.Types.ObjectId(userId);

        const mealPlans = await MealPlan.find({ userId: userIdObjectId });

        if (!mealPlans || mealPlans.length === 0) {
            return res.status(404).json({ message: 'No meal plans found for the user' });
        }

        res.status(200).json(mealPlans);
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            // Handle invalid ObjectId format
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        res.status(500).json({ message: 'Server error', error: error.message });
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
 * @function saveMealPlan
 * @description Saves a meal plan for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const saveMealPlan = async (req, res) => {
    try {
        const mealPlanData = req.body; // The meal plan data from the frontend
        const userId = req.oidc.user.sub; // Or however you get the user ID

        // Check if a meal plan for this user already exists
        let mealPlan = await MealPlan.findOne({ userId: userId });

        if (mealPlan) {
            // Update the existing meal plan
            mealPlan.meals = mealPlanData;
            await mealPlan.save();
        } else {
            // Create a new meal plan
            mealPlan = new MealPlan({
                userId: userId,
                meals: mealPlanData,
            });
            await mealPlan.save();
        }

        res.status(200).json({ message: 'Meal plan saved successfully' });
    } catch (error) {
        console.error('Error saving meal plan:', error);
        res.status(500).json({ message: 'Failed to save meal plan', error: error.message });
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
    getMealPlanByUserId,
    getMealPlanById,
    createMealPlan,
    saveMealPlan,
    updateMealPlan,
    deleteMealPlan
};