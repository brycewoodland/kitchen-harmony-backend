const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

/**
 * @swagger
 * components:
 *   schemas:
 *     InventoryItem:
 *       type: object
 *       required:
 *         - userId
 *         - ingredients
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the inventory item
 *         userId:
 *           type: string
 *           description: The ID of the user who owns the inventory item
 *         ingredients:
 *           type: array
 *           items:
 *             type: string
 *           description: List of ingredients in the inventory item
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the inventory item was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the inventory item was last updated
 *       example:
 *         id: 67906a3e8fd11b2671912edd
 *         userId: "67906759aa52af3c65c351ff"
 *         ingredients: ["Flour", "Sugar", "Cocoa powder"]
 *         createdAt: "2023-01-01T00:00:00.000Z"
 *         updatedAt: "2023-01-01T00:00:00.000Z"
 */

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Get all inventory items
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: A list of inventory items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryItem'
 *       404:
 *         description: No inventory items found
 */
router.get('/', inventoryController.getAllInventoryItems);

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Add a new item to the inventory
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryItem'
 *     responses:
 *       201:
 *         description: The inventory item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryItem'
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Internal server error
 */
router.post('/', inventoryController.createInventory);

/**
 * @swagger
 * /inventory/{inventoryId}:
 *   get:
 *     summary: Get a specific inventory item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the inventory item to fetch
 *     responses:
 *       200:
 *         description: The inventory item description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryItem'
 *       404:
 *         description: Inventory item not found with the provided ID
 *       500:
 *         description: Server error
 */
router.get('/:inventoryId', inventoryController.getInventoryById);

/**
 * @swagger
 * /inventory/{inventoryId}:
 *   put:
 *     summary: Update an inventory item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the inventory item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryItem'
 *     responses:
 *       200:
 *         description: The inventory item was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryItem'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Inventory item not found with the provided ID
 *       500:
 *         description: Internal server error
 */
router.put('/:inventoryId', inventoryController.updateInventoryItem);

/**
 * @swagger
 * /inventory/{inventoryId}:
 *   delete:
 *     summary: Delete an inventory item by ID
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: The inventory item ID
 *     responses:
 *       200:
 *         description: The inventory item was successfully deleted
 *       404:
 *         description: The inventory item was not found
 */
router.delete('/:inventoryId', inventoryController.deleteInventoryItem);

module.exports = router;