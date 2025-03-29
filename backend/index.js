require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Correct path to db.js
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB(); // This now properly calls the exported function

// Routes
app.use('/api/users', userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});