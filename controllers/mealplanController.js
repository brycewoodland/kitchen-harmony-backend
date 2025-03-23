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
 * @description Saves or updates a meal plan for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 */
const saveMealPlan = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.oidc || !req.oidc.user || !req.oidc.user.sub) {
            return res.status(401).json({ message: "Unauthorized: No user ID found" });
        }

        const userId = req.oidc.user.sub; // Extract user ID from Auth0
        const { mealPlan } = req.body; // Get meal plan data from request

        if (!mealPlan || typeof mealPlan !== 'object') {
            return res.status(400).json({ message: "Invalid meal plan data" });
        }

        // Transform mealPlan to match the schema
        const formattedMeals = Object.keys(mealPlan).flatMap(date =>
            Object.entries(mealPlan[date]).map(([mealType, recipe]) => ({
                recipeId: recipe._id,
                date: new Date(date),
                servings: recipe.servings || 1, // Default to 1 if not provided
            }))
        );

        // Check if a meal plan for this user exists
        let mealPlanRecord = await MealPlan.findOne({ userId });

        if (mealPlanRecord) {
            // Update existing meal plan
            mealPlanRecord.meals = formattedMeals;
            mealPlanRecord.dateRange = {
                start: new Date(Object.keys(mealPlan)[0]),
                end: new Date(Object.keys(mealPlan).slice(-1)[0]),
            };
        } else {
            // Create a new meal plan
            mealPlanRecord = new MealPlan({
                userId,
                dateRange: {
                    start: new Date(Object.keys(mealPlan)[0]),
                    end: new Date(Object.keys(mealPlan).slice(-1)[0]),
                },
                meals: formattedMeals,
            });
        }

        await mealPlanRecord.save();
        res.status(200).json({ message: "Meal plan saved successfully", mealPlan: mealPlanRecord });
    } catch (error) {
        console.error("Error saving meal plan:", error);
        res.status(500).json({ message: "Failed to save meal plan", error: error.message });
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