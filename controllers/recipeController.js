const Recipe = require('../models/recipeModel');

/**
 * @function getAllRecipes
 * @description Gets all recipes from the database.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().toArray();
        res.status(200).json(recipes);
    } catch (err) {
        console.error('Error fetching recipes:', err);
        res.status(500).json({ message: err.message });
    }
};

/**
 * @function getRecipeById
 * @description Gets a single recipe by id from the database.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        
        if(!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllRecipes,
    getRecipeById
}