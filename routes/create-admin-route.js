const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin'); // ✅ Correct path
const bcrypt = require('bcryptjs');

// Accessible at: /api/create-admin
router.get('/api/create-admin', async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new Admin({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
    });

    await admin.save();
    res.status(201).json({ success: true, message: 'Admin created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
