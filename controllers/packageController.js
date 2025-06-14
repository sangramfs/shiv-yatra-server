const Package = require('../models/Package');

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: packages.length,
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
const getPackage = async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);

    if (!package || !package.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    res.json({
      success: true,
      data: package
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create new package
// @route   POST /api/admin/package
// @access  Private (Admin)
const createPackage = async (req, res) => {
  try {
    const package = await Package.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      data: package
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create package',
      error: error.message
    });
  }
};

// @desc    Update package
// @route   PUT /api/admin/package/:id
// @access  Private (Admin)
const updatePackage = async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    res.json({
      success: true,
      message: 'Package updated successfully',
      data: package
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update package',
      error: error.message
    });
  }
};

// @desc    Delete package
// @route   DELETE /api/admin/package/:id
// @access  Private (Admin)
const deletePackage = async (req, res) => {
  try {
    const package = await Package.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    res.json({
      success: true,
      message: 'Package deleted successfully'
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
  getPackages,
  getPackage,
  createPackage,
  updatePackage,
  deletePackage
};