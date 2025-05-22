const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // adjust path

async function createAdmin() {
  await mongoose.connect('mongodb://localhost:27017/your-db-name');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await User.findOneAndUpdate(
    { email: 'admin@example.com' },
    {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      number: '9999999999',
      dob: new Date('1990-01-01'),
      gender: 'Male',
    },
    { upsert: true }
  );

  console.log('✅ Admin user created/updated');
  mongoose.disconnect();
}

createAdmin();
