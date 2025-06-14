const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ✅ TEMP route to create admin user once
app.use('/api/dev', require('./routes/create-admin-route'));

// Public Routes
app.use('/api/admin', require('./routes/auth'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/book', require('./routes/bookings'));
app.use('/api/contact', require('./routes/contacts'));

// Admin routes
app.use('/api/admin/package', require('./routes/packages'));
app.use('/api/admin/gallery', require('./routes/gallery'));
app.use('/api/admin/bookings', require('./routes/bookings'));
app.use('/api/admin/contacts', require('./routes/contacts'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
