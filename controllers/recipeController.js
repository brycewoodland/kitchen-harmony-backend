const Recipe = require('../models/recipeModel');

/**
 * @function getAllRecipes
 * @description Gets all recipes associated with the user's ID from the database.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const getAllRecipes = async (req, res) => {
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
        const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found.'});
        }
        res.json({ message: 'Recipe updated successfully!'});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * @function deleteRecipe
 * @description Gets a recipe by its id and deletes its information.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found.'});
        }
        res.json({ message: 'Recipe deleted succesfully!'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
}