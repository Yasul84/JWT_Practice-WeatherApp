const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Generate JWT 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Register user
const registerUser = asyncHandler( async(req, res) => {
    const { name, email, password } = req.body;

    // Check if user filled out client-side registration form correctly
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please, complete all registration fields.');
    }

    // Check if user already exists
    const userExists = await User.findOne({email});

    if (userExists) {
        res.status(400);
        throw new Error('User already exists.');
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword
    });

    if (user) {
        res.status(201);
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id) 
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
});

// Login user
const loginUser = asyncHandler( async(req, res) => {
    const { email, password } = req.body;

    // Check if user filled out client-side login form correctly
    if (!email || !password) {
        res.status(400);
        throw new Error('Please, fill out all login fields.');
    }

    // Check if user exists
    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201);
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user credentials.');
    }

    console.log(user);
});

module.exports = {
    registerUser,
    loginUser
}