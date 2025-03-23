const express = require("express");
const checkJwt = require("../middleware/auth");
const User = require("../models/User");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// Auth0 credentials
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_AUDIENCE = `https://${AUTH0_DOMAIN}/api/v2/`;

// Function to get Auth0 Management API token
const getAuth0Token = async () => {
  const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
    client_id: AUTH0_CLIENT_ID,
    client_secret: AUTH0_CLIENT_SECRET,
    audience: AUTH0_AUDIENCE,
    grant_type: "client_credentials",
  });
  return response.data.access_token;
};

// Get logged-in user profile
router.get("/profile", checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.payload.sub;

    // Check if user exists in database
    let user = await User.findOne({ auth0Id });

    if (!user) {
      // Fetch user metadata from Auth0
      const token = await getAuth0Token();
      const auth0User = await axios.get(
        `https://${AUTH0_DOMAIN}/api/v2/users/${auth0Id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Extract metadata
      const { email, user_metadata } = auth0User.data;
      const fname = user_metadata?.fname || "";
      const lname = user_metadata?.lname || "";
      const username = user_metadata?.username || "";

      // Create and save new user in MongoDB
      user = new User({ auth0Id, email, fname, lname, username });
      await user.save();
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
