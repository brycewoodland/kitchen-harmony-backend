const express = require("express");
const checkJwt = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

// Get logged-in user profile
router.get("/profile", checkJwt, async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.auth.payload.sub });

    if (!user) {
      const newUser = new User({
        auth0Id: req.auth.payload.sub,
        email: req.auth.payload.email,
        name: req.auth.payload.name,
      });
      await newUser.save();
      return res.json(newUser);
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
