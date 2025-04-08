const MealPlan = require('../models/mealplanModel');

/**
 * @function getAllMealPlans
 * @description Gets all meal plans from the database.
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
 * @function getMealPlanByAuth0Id
 * @description Gets meal plan by Auth0 user ID.
 */
const getMealPlanByAuth0Id = async (req, res) => {
    try {
      if (!req.auth || !req.auth.payload) {
        console.error('Missing authentication payload');
        return res.status(401).json({ message: 'Unauthorized - Missing Auth Payload' });
      }
  
      const auth0Id = req.auth.payload.sub;
  
      const mealPlans = await MealPlan.find({ auth0Id });
  
      if (mealPlans.length === 0) {
        console.warn('No Meal Plans Found for User:', auth0Id);
        return res.status(404).json({ message: 'No meal plans found for this user' });
      }
  
      res.status(200).json(mealPlans);
    } catch (error) {
      console.error('ERROR in getMealPlanByAuth0Id:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
/**
 * @function getMealPlanById
 * @description Gets a single meal plan by ID.
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
 */
const createMealPlan = async (req, res) => {
    try {
        const auth0Id = req.auth.payload.sub; // Get Auth0 ID from token

        const newMealPlan = new MealPlan({
            name: req.body.name,
            description: req.body.description,
            meals: req.body.meals,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            auth0Id // Store Auth0 ID in MongoDB
        });

        await newMealPlan.save();
        res.status(201).json(newMealPlan);
    } catch (error) {
        console.error("Error creating meal plan:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/**
 * @function saveMealPlan
 * @description Saves or updates a meal plan for the authenticated user.
 */
const saveMealPlan = async (req, res) => {
    try {
        const auth0Id = req.auth.payload.sub; // Get Auth0 ID from token
        const { mealPlan } = req.body; // Get meal plan data from request

        if (!mealPlan || typeof mealPlan !== 'object') {
            return res.status(400).json({ message: "Invalid meal plan data" });
        }

        // Check if a meal plan for this user exists
        let mealPlanRecord = await MealPlan.findOne({ auth0Id });

        if (mealPlanRecord) {
            // Update existing meal plan
            mealPlanRecord.meals = mealPlan.meals;
            mealPlanRecord.startDate = mealPlan.startDate;
            mealPlanRecord.endDate = mealPlan.endDate;
        } else {
            // Create a new meal plan
            mealPlanRecord = new MealPlan({
                auth0Id,
                name: mealPlan.name,
                description: mealPlan.description,
                meals: mealPlan.meals,
                startDate: mealPlan.startDate,
                endDate: mealPlan.endDate,
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
 * @description Updates a meal plan by its ID.
 */
const updateMealPlan = async (req, res) => {
    try {
        const mealPlan = await MealPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found.' });
        }
        res.json({ message: 'Meal plan updated successfully!' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * @function deleteMealPlan
 * @description Deletes a meal plan by its ID.
 */
const deleteMealPlan = async (req, res) => {
    try {
        const mealPlan = await MealPlan.findByIdAndDelete(req.params.id);
        if (!mealPlan) {
            return res.status(404).json({ message: 'Meal plan not found.' });
        }
        res.json({ message: 'Meal plan deleted successfully!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllMealPlans,
    getMealPlanByAuth0Id,
    getMealPlanById,
    createMealPlan,
    saveMealPlan,
    updateMealPlan,
    deleteMealPlan
};
