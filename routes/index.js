const express = require('express');
const routes = express.Router();

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

routes.use('/', require('./userRoute'));
routes.use('/', require('./recipeRoute'));
routes.use('/', require('./inventoryRoute'));
routes.use('/', require('./shoppingListRoute'));

module.exports = routes;