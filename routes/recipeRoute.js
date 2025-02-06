const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { requiresAuth } = require('express-openid-connect');

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - ingredients
 *         - instructions
 *         - author
 *         - isPublic
 *         - tags
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         title:
 *           type: string
 *           description: The name of the recipe
 *         description:
 *           type: string
 *           description: The description of the recipe
 *         ingredients:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *              name:
 *                type: string
 *              quantity:
 *                type: string
 *              unit:
 *                type: string
 *           description: Ingredients in the recipe
 *         instructions:
 *           type: string
 *         isPublic:
 *           type: boolean
 *         tags:
 *           type: array
 *           items: 
 *             type: string
 *         imageUrl:
 *           type: string
 *       example:
 *         id: 67906a3e8fd11b2671912edd
 *         title: "Chocolate Cake"
 *         description: "A rich and moist chocolate cake."
 *         ingredients:
 *           - name: "Flour"
 *             quantity: "2"
 *             unit: "cups"
 *           - name: "Sugar"
 *             quantity: "1"
 *             unit: "cup"
 *           - name: "Cocoa powder"
 *             quantity: "1/2"
 *             unit: "cup"
 *         instructions: "Mix the ingredients and bake at 350°F for 30 minutes."
 *         isPublic: true
 *         tags: ["dessert", "chocolate"]
 *         imageUrl: "http://example.com/chocolate-cake.jpg"
 *         userId: "67906759aa52af3c65c351ff"
 */

/**
 * @swagger
 * /recipe:
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipe]
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: No recipes found
 */
router.get('/', recipeController.getAllRecipes);

/**
 * @swagger
 * /recipe/{id}:
 *   get:
 *     summary: Get a recipe by ID
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recipe to fetch
 *     responses:
 *       200:
 *         description: The recipe description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found with the provided ID
 *       500:
 *         description: Server error
 */
router.get('/:id', recipeController.getRecipeById);

/**
 * @swagger
 * /recipe:
 *   post:
 *     summary: Create a new recipe
 *     tags: [Recipe]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       201:
 *         description: The recipe was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/', requiresAuth(), recipeController.createRecipe);

/**
 * @swagger
 * /recipe/{id}:
 *   put:
 *     summary: Update a recipe by ID
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the recipe to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: The recipe was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Recipe not found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.put('/:id', requiresAuth(), recipeController.updateRecipe);

/**
 * @swagger
 * /recipe/{id}:
 *   delete:
 *     summary: Delete a recipe by ID
 *     tags: [Recipe]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The recipe ID
 *     responses:
 *       200:
 *         description: The recipe was successfully deleted
 *       404:
 *         description: The recipe was not found
 */
router.delete('/:id', requiresAuth(), recipeController.deleteRecipe);

module.exports = router;