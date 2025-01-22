const User = require('../models/userModel');

/**
 * @function createUser
 * @description Creates a new user in the database.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

/**
 * @function getUserById
 * @description Gets a user by their id.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    } 
};

/**
 * @function updateUser
 * @description Gets a user by their id and updates their information.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id);
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

/**
 * @function deleteUser
 * @description Gets a user by their id and deletes their information.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser
}