const express = require('express');
const {
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage
} = require('../controllers/packageController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getPackages);
router.get('/:id', getPackage);

// Admin routes
router.post('/', authMiddleware, createPackage);
router.put('/:id', authMiddleware, updatePackage);
router.delete('/:id', authMiddleware, deletePackage);

module.exports = router;