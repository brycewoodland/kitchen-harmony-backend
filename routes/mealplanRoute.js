const express = require('express');
const router = express.Router();
const mealplanController = require('../controllers/mealplanController');
const checkJwt = require('../middleware/auth');

/**
 * @swagger
 * /mealplan/user:
 *   get:
 *     summary: Get meal plan for the authenticated user
 *     tags: 
 *       - Mealplan
 *     description: Fetches the meal plan associated with the authenticated user's Auth0 ID.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Meal plans found.
 *       401:
 *         description: Unauthorized - JWT is missing or invalid.
 *       404:
 *         description: No meal plan found for the user.
 *       500:
 *         description: Server error.
 */
router.get('/user', checkJwt, mealplanController.getMealPlanByAuth0Id);

/**
 * @swagger
 * /mealplan/{mealPlanId}/add-recipe:
 *   post:
 *     summary: Add a recipe to a meal plan
 *     tags: [Mealplan]
 *     description: Adds a recipe to an existing meal plan by meal plan ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: mealPlanId
 *         required: true
 *         description: ID of the meal plan to which the recipe should be added
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipeId:
 *                 type: string
 *                 description: The ID of the recipe to add
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date the recipe is planned for
 *               servings:
 *                 type: integer
 *                 description: Number of servings for the recipe
 *     responses:
 *       200:
 *         description: Recipe successfully added to the meal plan
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Meal plan not found
 *       500:
 *         description: Server error
 */
router.post('/:mealPlanId/add-recipe', checkJwt, mealplanController.saveMealPlan);

/**
 * @swagger
 * /mealplan/{id}:
 *   get:
 *     summary: Get a specific meal plan
 *     tags: [Mealplan]
 *     description: Fetches a meal plan by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the meal plan
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meal plan found.
 *       404:
 *         description: Meal plan not found.
 *       500:
 *         description: Server error.
 */
router.get('/:id', mealplanController.getMealPlanById);

/**
 * @swagger
 * /mealplan/{id}:
 *   put:
 *     summary: Update a meal plan
 *     tags: [Mealplan]
 *     description: Modifies an existing meal plan.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the meal plan to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               meals:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Meal plan updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Meal plan not found.
 */
router.put('/:id', checkJwt, mealplanController.updateMealPlan);

/**
 * @swagger
 * /mealplan/{id}:
 *   delete:
 *     summary: Delete a meal plan
 *     tags: [Mealplan]
 *     description: Removes a meal plan from the database.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the meal plan to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meal plan deleted successfully.
 *       404:
 *         description: Meal plan not found.
 *       500:
 *         description: Server error.
 */
router.delete('/:id', checkJwt, mealplanController.deleteMealPlan);

/**
 * @swagger
 * /mealplan:
 *   get:
 *     summary: Retrieve all meal plans
 *     tags: [Mealplan]
 *     description: Fetches all meal plans from the database.
 *     responses:
 *       200:
 *         description: A list of meal plans.
 *       500:
 *         description: Server error.
 */
router.get('/', mealplanController.getAllMealPlans);

/**
 * @swagger
 * /mealplan:
 *   post:
 *     summary: Create a new meal plan
 *     tags: [Mealplan]
 *     description: Adds a new meal plan to the database.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               meals:
 *                 type: array
 *                 items:
 *                   type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Meal plan created successfully.
 *       400:
 *         description: Bad request.
 */
router.post('/', checkJwt, mealplanController.createMealPlan);

module.exports = router;