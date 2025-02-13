const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Auth managing API
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Check authentication status
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Returns the authentication status
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logged in
 *       401:
 *         description: User is not authenticated
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Logged out
 */
// Example route to check authentication status

router.use('/users', require('./userRoute'));
router.use('/recipe', require('./recipeRoute'));
router.use('/mealplan', require('./mealplanRoute'));
router.use('/inventory', require('./inventoryRoute'));
router.use('/shoppingLists', require('./shoppingListRoute'));

module.exports = router;