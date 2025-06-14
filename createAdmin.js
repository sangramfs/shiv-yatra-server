require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB connection failed:', err));

async function createAdmin() {
  try {
    const existingAdmin = await Admin.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists!');
      process.exit(0);
    }

    const admin = new Admin({
      email: 'admin@example.com',
      password: 'admin123'
    });

    await admin.save();
    console.log('✅ Admin created!');
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err.message);
    process.exit(1);
  }
}

createAdmin();
