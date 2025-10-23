// Import Express and create a router
const express = require("express");
const router = express.Router();

// Import auth controller functions
const { signup, login } = require("../controllers/authController");

// POST /api/auth/signup - Create new user
router.post("/signup", signup);

// POST /api/auth/login - Login user
router.post("/login", login);

// Export the router
module.exports = router;
