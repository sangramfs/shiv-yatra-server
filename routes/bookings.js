const express = require('express');
const {
  createBooking,
  getBookings
} = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/', createBooking);

// Admin routes
router.get('/', authMiddleware, getBookings);

module.exports = router;