const express = require('express');
const router = express.Router();
const Admin = require('./models/Admin'); // Adjust path if needed
const bcrypt = require('bcryptjs');

router.get('/create-admin-once', async (req, res) => {
  try {
    const existing = await Admin.findOne({ email: 'admin@example.com' });

    if (existing) {
      return res.send('⚠️ Admin already exists');
    }

    const hashedPassword = await bcrypt.hash('admin123', 12);

    const admin = new Admin({
      email: 'admin@example.com',
      password: hashedPassword
    });

    await admin.save();
    res.send('✅ Admin created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Server error: ' + err.message);
  }
});

module.exports = router;
