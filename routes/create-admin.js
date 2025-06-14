const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

// This route will create an admin ONCE
router.get('/', async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const newAdmin = new Admin({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ success: true, message: 'Admin created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
