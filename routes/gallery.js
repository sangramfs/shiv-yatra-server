const express = require('express');
const {
  getGallery,
  addGalleryImage,
  deleteGalleryImage
} = require('../controllers/galleryController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getGallery);

// Admin routes
router.post('/', authMiddleware, addGalleryImage);
router.delete('/:id', authMiddleware, deleteGalleryImage);

module.exports = router;