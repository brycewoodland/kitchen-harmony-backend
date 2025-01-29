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
        if(!inventory) {
            return res.status(404).send;
        }
        res.send(inventory);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.export = {
    createInventory,
    getInventoryById
}