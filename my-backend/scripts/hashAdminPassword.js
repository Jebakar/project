const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Adjust path if needed

const run = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mydb'); // <-- Replace with your DB name

    const plainPassword = 'admin123'; // Set new admin password here
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      { email: 'admin@example.com' }, // Your admin email
      { password: hashedPassword, role: 'admin' },
      { new: true },
      {firstName: 'Admin'}
    );

    if (updatedUser) {
      console.log('✅ Admin password updated and hashed.');
    } else {
      console.log('❌ Admin user not found.');
    }

    mongoose.disconnect();
  } catch (error) {
    console.error('Error updating admin password:', error);
  }
};

run();
