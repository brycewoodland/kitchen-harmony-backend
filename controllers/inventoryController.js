const Inventory = require('../models/inventoryModel');

/**
 * @function createInventory
 * @description Creates a new inventory.
 * @param {Object} req - Express request object containing inventory data in the body.
 * @param {Object} res - Express response object used to send back the created inventory or an error message.
 * @returns {void}
 */
const createInventory = async (req, res) => {
    try {
        const inventory = new Inventory(req.body);
        await inventory.save();
        res.status(201).send(inventory);
    } catch (error) {
        res.status(400).send(error);
    }
};

/**
 * @function getInventoryById
 * @description Gets an inventory by its id.
 * @param {Object} req - Express request object containing inventory data in the body.
 * @param {Object} res - Express response object used to send back the created inventory or an error message.
 * @returns {void}
 */
const getInventoryById = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        if (!inventory) {
            return res.status(404).send();
        }
        res.send(inventory);
    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * @function getAllInventoryItems
 * @description Gets all inventory items.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object used to send back the list of inventory items or an error message.
 * @returns {void}
 */
const getAllInventoryItems = async (req, res) => {
    try {
        const inventoryItems = await Inventory.find({});
        res.send(inventoryItems);
    } catch (error) {
        res.status(500).send(error);
    }
};

/**
 * @function updateInventoryItem
 * @description Updates an inventory item by its id.
 * @param {Object} req - Express request object containing inventory data in the body.
 * @param {Object} res - Express response object used to send back the updated inventory item or an error message.
 * @returns {void}
 */
const updateInventoryItem = async (req, res) => {
    try {
        const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!inventory) {
            return res.status(404).send();
        }
        res.send(inventory);
    } catch (error) {
        res.status(400).send(error);
    }
};

/**
 * @function deleteInventoryItem
 * @description Deletes an inventory item by its id.
 * @param {Object} req - Express request object containing the inventory item id in the params.
 * @param {Object} res - Express response object used to send back a success message or an error message.
 * @returns {void}
 */
const deleteInventoryItem = async (req, res) => {
    try {
        const inventory = await Inventory.findByIdAndDelete(req.params.id);
        if (!inventory) {
            return res.status(404).send();
        }
        res.send({ message: 'Inventory item deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createInventory,
    getInventoryById,
    getAllInventoryItems,
    updateInventoryItem,
    deleteInventoryItem
};