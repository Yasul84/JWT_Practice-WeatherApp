const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const ErrorHandler = require('./middleware/ErrorMiddleware');
const connectDB = require('./config/DB');

const port = process.env.PORT || 5000;

const app = express();

// Middleware // 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));

// Error Handling
app.use(ErrorHandler);

// MongoDB connection 
connectDB();

app.listen(port, function() {
    console.log(`Server listening on port: ${port}`);
});