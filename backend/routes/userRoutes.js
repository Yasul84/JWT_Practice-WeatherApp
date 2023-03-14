const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userControllers');

// User routes //

//Login user route
router.post('/login', loginUser);

// Register user route
router.post('/', registerUser);

module.exports = router;