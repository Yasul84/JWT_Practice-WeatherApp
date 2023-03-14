const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// Get goals
const getGoals = asyncHandler( async(req, res) => {
    const response = await Goal.find({ user: req.user.id });
    
    res.status(200).json(response);
    
});

// Create a goal
const createGoal = asyncHandler( async(req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please, add goal objective to field.');
    }

    const response = await Goal.create({
        text: req.body.text,
        user: req.user.id
    });

    res.status(200).json(response);
});

// Update a goal
const updateGoal = asyncHandler( async(req, res) => {
    // Find goal
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found.');
    }

    // Find user associated with above goal
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(400);
        throw new Error('User not found.');
    }

    // Ensure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized for that action.');
    }

    // Update goal
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.status(200);
    res.json(updatedGoal);
});

// Delete a goal
const deleteGoal = asyncHandler( async(req, res) => {
    // Find goal
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found.');
    }

    // Find user associated with above goal
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(400);
        throw new Error('User not found.');
    }

    // Ensure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(400);
        throw new Error('User not authorized for that action.');
    }

    // Delete the goal
    await goal.remove();

    res.status(200);
    res.json({ id: req.params.id });
});

module.exports = {
    getGoals, 
    createGoal, 
    updateGoal,
    deleteGoal
}