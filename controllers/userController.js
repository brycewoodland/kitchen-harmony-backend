const { User, Counter } = require('../models/userModel');

const getNextSequenceValue = async (counterName) => {
    const counter = await Counter.findOneAndUpdate(
        { _id: counterName },
        { $inc: { seq: 4 } },
        { new: true, upsert: true }  // Create a new counter if it doesn't exist
    );
    return counter.seq.toString();  // Convert the numeric sequence to a string
};


/**
 * @function createUser
 * @description Creates a new user in the database and saves their email.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const createUser = async (req, res) => {
    try {
        const { email, auth0Id } = req.body;  // Get email and auth0Id from the request body

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Generate a new user ID using the counter generator
        const newUserId = await getNextSequenceValue('userId');

        // Create a new user in the database with the provided email, generated ID, and auth0Id
        const newUser = new User({
            email,
            id: newUserId,  // Use the generated user ID
            auth0Id,        // Store the Auth0 ID
            recipes: [],    // Empty recipe list by default
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with a success message and the created user
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};


/**
 * @function getUserById
 * @description Gets a user by their id.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
// Backend endpoint to fetch user by custom ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ auth0Id: req.params.auth0Id });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
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

/**
 * @function getUserByEmail
 * @description Gets a user by their email.
 * @param {Object} req - Express request object containing user data in the body.
 * @param {Object} res - Express response object used to send back the created user or an error message.
 * @returns {void}
 */
const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
            .select("_id fname lname username email recipes"); // Selects only necessary fields
        
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    getUserByEmail
};