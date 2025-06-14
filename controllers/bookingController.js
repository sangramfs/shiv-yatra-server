const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/book
// @access  Public
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    await booking.populate('packageId', 'title price');

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
};

// @desc    Get all bookings
// @route   GET /api/admin/bookings
// @access  Private (Admin)
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('packageId', 'title price')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  getBookings
};