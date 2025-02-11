const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppingListController');

/**
 * @swagger
 * components:
 *   schemas:
 *     ShoppingList:
 *       type: object
 *       required:
 *         - title
 *         - items
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the shopping list
 *         title:
 *           type: string
 *           description: The title of the shopping list
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the item
 *               quantity:
 *                 type: string
 *                 description: The quantity of the item
 *               unit:
 *                 type: string
 *                 description: The unit of the item
 *         userId:
 *           type: string
 *           description: The ID of the user who owns the shopping list
 *       example:
 *         id: "67906ef08fd11b2671912ee2"
 *         title: "My Grocery List"
 *         items:
 *           - name: "Cocoa powder"
 *             quantity: "1/2"
 *             unit: "cup"
 *           - name: "Butter"
 *             quantity: "1"
 *             unit: "cup"
 *         userId: "67906759aa52af3c65c351ff"
 */

/**
 * @swagger
 * /shoppingLists:
 *   get:
 *     summary: Retrieve all shopping lists
 *     tags: [ShoppingList]
 *     description: Fetches all shopping lists for the user.
 *     responses:
 *       200:
 *         description: A list of shopping lists.
 *       500:
 *         description: Server error.
 */
router.get('/', shoppingListController.getAllShoppingLists);

/**
 * @swagger
 * /shoppingLists/{shoppingListId}:
 *   get:
 *     summary: Get a specific shopping list
 *     tags: [ShoppingList]
 *     description: Fetches a shopping list by its ID.
 *     parameters:
 *       - in: path
 *         name: shoppingListId
 *         required: true
 *         description: ID of the shopping list
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shopping list found.
 *       404:
 *         description: Shopping list not found.
 *       500:
 *         description: Server error.
 */
router.get('/:shoppingListId', shoppingListController.getShoppingListById);

/**
 * @swagger
 * /shoppingLists:
 *   post:
 *     summary: Create a new shopping list
 *     tags: [ShoppingList]
 *     description: Adds a new shopping list to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingList'
 *     responses:
 *       201:
 *         description: Shopping list created successfully.
 *       400:
 *         description: Bad request.
 */
router.post('/', shoppingListController.createShoppingList);

/**
 * @swagger
 * /shoppingLists/{shoppingListId}:
 *   put:
 *     summary: Update a shopping list
 *     tags: [ShoppingList]
 *     description: Modifies an existing shopping list.
 *     parameters:
 *       - in: path
 *         name: shoppingListId
 *         required: true
 *         description: ID of the shopping list to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingList'
 *     responses:
 *       200:
 *         description: Shopping list updated successfully.
 *       400:
 *         description: Bad request.
 *       404:
 *         description: Shopping list not found.
 */
router.put('/:shoppingListId', shoppingListController.updateShoppingList);

/**
 * @swagger
 * /shoppingLists/{shoppingListId}:
 *   delete:
 *     summary: Delete a shopping list
 *     tags: [ShoppingList]
 *     description: Removes a shopping list from the database.
 *     parameters:
 *       - in: path
 *         name: shoppingListId
 *         required: true
 *         description: ID of the shopping list to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Shopping list deleted successfully.
 *       404:
 *         description: Shopping list not found.
 *       500:
 *         description: Server error.
 */
router.delete('/:shoppingListId', shoppingListController.deleteShoppingList);

module.exports = router;
