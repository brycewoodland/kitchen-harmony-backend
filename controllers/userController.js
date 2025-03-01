const User = require('../models/userModel');

/**
 * @function createUser
 * @description Creates a new user in the database.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const createUser = async (req, res) => {
        const user = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            email: req.body.email,
            recipes: req.body.recipes
        });

    try {
        const newUser = await user.save();
        res.status(201).json({ id: newUser._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
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
        const user = await User.findById(req.params.id)
            .select("_id fname lname username email recipes"); // Selects only necessary fields
        
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).send({ message: err.message });
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
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
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
        if (!user) {
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
};