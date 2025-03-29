const ShoppingList = require('../models/shoppingListModel');

/**
 * @function getAllShoppingLists
 * @description Retrieves all shopping lists for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const getAllShoppingLists = async (req, res) => {
  try {
      const shoppingLists = await ShoppingList.find();
      res.json(shoppingLists);
  } catch (error) {
      console.error("Error fetching shopping lists:", error);
      res.status(500).json({ message: "Server error" });
  }
};

/**
 * @function getShoppingListById
 * @description Retrieves a specific shopping list by ID for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const getShoppingListById = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.shoppingListId);
    if (!shoppingList) {
      return res.status(404).json({ message: 'Shopping list not found' });
    }
    res.json(shoppingList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @function createShoppingList
 * @description Creates a new shopping list for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const createShoppingList = async (req, res) => {
  const shoppingList = new ShoppingList({
    title: req.body.title,
    items: req.body.items,
    userId: req.body.userId,
  });

  try {
    const newShoppingList = await shoppingList.save();
    res.status(201).json({ id: newShoppingList._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


/**
 * @function updateShoppingList
 * @description Updates an existing shopping list by ID for the authenticated user.
 * @param {Object} req - Express request object containing updated shopping list data.
 * @param {Object} res - Express response object used to send back the updated shopping list or an error message.
 * @returns {void}
 */
const updateShoppingList = async (req, res) => {
  const shoppingListData = {
    title: req.body.title,
    items: req.body.items,
    userId: req.body.userId,
  };

  try {
    // Update the shopping list with the new data
    const updatedShoppingList = await ShoppingList.findByIdAndUpdate(
      req.params.shoppingListId,
      shoppingListData,
      { new: true }
    );

    if (!updatedShoppingList) {
      return res.status(404).json({ message: 'Shopping list not found.' });
    }

    res.status(200).json({ message: 'Grocery List updated successfully!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * @function deleteShoppingList
 * @description Deletes a shopping list by ID for the authenticated user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const deleteShoppingList = async (req, res) => {
  try {
    const deletedShoppingList = await ShoppingList.findByIdAndDelete(req.params.shoppingListId);

    if (!deletedShoppingList) {
      return res.status(404).json({ message: 'Shopping list not found.' });
    }

    res.status(200).json({ message: 'Grocery List deleted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
    getAllShoppingLists,
    getShoppingListById,
    createShoppingList,
    updateShoppingList,
    deleteShoppingList
};