const mongoose = require('mongoose');
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
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (err) {
        console.error('Error fetching recipes:', err);
        res.status(500).json({ message: err.message });
    }
};

/**
 * @function getAllRecipesByUserId
 * @description Gets all recipes associated with the user's ID from the database.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const getAllRecipesByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const recipes = await Recipe.find({ userId });
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

/**
 * @function createRecipe
 * @description Posts a new recipe.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const createRecipe = async (req, res) => {
    const recipe = new Recipe({
        title: req.body.title,
        description: req.body.description,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        createdAt: req.body.createdAt,
        author: req.body.author,
        isPublic: req.body.isPublic,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId
    });

    try {
        const newRecipe = await recipe.save();
        res.status(201).json({ message: newRecipe._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * @function updateRecipe
 * @description Gets a recipe by its id and updates its information.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const updateRecipe = async (req, res) => {
    try {
        console.log('Updating recipe with data:', req.body); // Log the incoming data
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found.' });
        }
        
        res.status(200).json({ message: 'Recipe updated successfully!', recipe });
    } catch (err) {
        console.error('Error updating recipe:', err);
        res.status(400).json({ message: err.message });
    }
};

const deleteRecipe = async (req, res) => {
    try {
      const { id } = req.params;

      const recipe = await Recipe.findById(id);

      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      await Recipe.findByIdAndDelete(id);
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ message: 'Error deleting recipe' });
    }
};

module.exports = {
    getAllRecipes,
    getAllRecipesByUserId,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
};