const mongoose = require('mongoose');

// Goal Model
const goalModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'user'
    }, 
    text: {
        type: String, 
        required: [true, 'Please, enter goal objective into field.']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('goals', goalModel);