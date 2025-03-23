const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkJwt = require('../middleware/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         fname:
 *           type: string
 *           description: The first name of the user
 *         lname:
 *           type: string
 *           description: The last name of the user
 *         username:
 *           type: string
 *           description: The unique username of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         recipes:
 *           type: array
 *           items:
 *             type: string
 *           description: List of recipe IDs
 *         auth0Id:
 *           type: string
 *           description: The unique identifier for the user in Auth0
 *       example:
 *         id: 67906759aa52af3c65c351ff
 *         fname: Bryce
 *         lname: Woodland
 *         username: bryce_woodland
 *         email: woo17047@byui.edu
 *         recipes: [67906a3e8fd11b2671912edd]
 *         auth0Id: auth0|1234567890abcdef
 */

/**
 * @swagger
 * /users/auth0/{auth0Id}:
 *   get:
 *     summary: Get a user by Auth0 ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: auth0Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Auth0 user ID
 *     responses:
 *       200:
 *         description: The user details retrieved by Auth0 ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get('/auth0/:auth0Id', userController.getUserById);


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Some server error
 */
router.put('/:id', checkJwt, userController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user was successfully deleted
 *       404:
 *         description: The user was not found
 */
router.delete('/:id', checkJwt, userController.deleteUser);

/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Get a user by email
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The email of the user
 *     responses:
 *       200:
 *         description: The user description by email
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */
router.get('/email/:email', userController.getUserByEmail);


module.exports = router;