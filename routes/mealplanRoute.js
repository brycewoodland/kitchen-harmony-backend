const express = require('express');
const router = express.Router();
const mealplanController = require('../controllers/mealplanController');

/**
 * @swagger
 * components:
 *   schemas:
 *     MealPlan:
 *       type: object
 *       required:
 *         - name
 *         - meals
 *         - startDate
 *         - endDate
 *         - userId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the meal plan
 *         name:
 *           type: string
 *           description: The name of the meal plan
 *         description:
 *           type: string
 *           description: A brief description of the meal plan
 *         meals:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *                 description: The day of the meal (e.g., Monday, Tuesday)
 *               recipes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Recipe IDs associated with the meal
 *           description: A list of meals planned for each day
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the meal plan
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the meal plan
 *         userId:
 *           type: string
 *           description: The ID of the user who created the meal plan
 *       example:
 *         id: "67906a3e8fd11b2671912edd"
 *         name: "Weekly Healthy Meal Plan"
 *         description: "A meal plan for a healthy diet throughout the week."
 *         meals:
 *           - day: "Monday"
 *             recipes: ["67906a3e8fd11b2671912abc", "67906a3e8fd11b2671912def"]
 *           - day: "Tuesday"
 *             recipes: ["67906a3e8fd11b2671912ghi"]
 *         startDate: "2024-02-01"
 *         endDate: "2024-02-07"
 *         userId: "67906759aa52af3c65c351ff"
 */

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
 * /mealplan:
 *   post:
 *     summary: Create a new meal plan
 *     tags: [Mealplan]
 *     description: Adds a new meal plan to the database.
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
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Meal plan created successfully.
 *       400:
 *         description: Bad request.
 */
router.post('/', mealplanController.createMealPlan);

/**
 * @swagger
 * /mealplan/{id}:
 *   put:
 *     summary: Update a meal plan
 *     tags: [Mealplan]
 *     description: Modifies an existing meal plan.
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
router.put('/:id', mealplanController.updateMealPlan);

/**
 * @swagger
 * /mealplan/{id}:
 *   delete:
 *     summary: Delete a meal plan
 *     tags: [Mealplan]
 *     description: Removes a meal plan from the database.
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
router.delete('/:id', mealplanController.deleteMealPlan);

module.exports = router;
