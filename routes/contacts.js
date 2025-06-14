const express = require('express');
const {
  createContact,
  getContacts
} = require('../controllers/contactController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/', createContact);

// Admin routes
router.get('/', authMiddleware, getContacts);

module.exports = router;