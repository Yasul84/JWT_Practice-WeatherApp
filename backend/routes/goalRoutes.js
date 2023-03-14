const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goalControllers');
const { protect } = require('../middleware/authMiddleware');

// Goal routes //

// Get goals
router.get('/', protect, getGoals);

// Create a gol
router.post('/', protect, createGoal);

// Update a goal
router.put('/:id', protect, updateGoal);

// Delete a goal
router.delete('/:id', protect, deleteGoal);

module.exports = router;