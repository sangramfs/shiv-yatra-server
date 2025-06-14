const Gallery = require('../models/Gallery');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res) => {
  try {
    const images = await Gallery.find({ isActive: true }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: images.length,
      data: images
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Add new gallery image
// @route   POST /api/admin/gallery
// @access  Private (Admin)
const addGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Image added to gallery successfully',
      data: image
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to add image to gallery',
      error: error.message
    });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/admin/gallery/:id
// @access  Private (Admin)
const deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    res.json({
      success: true,
      message: 'Image deleted successfully'
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
  getGallery,
  addGalleryImage,
  deleteGalleryImage
};