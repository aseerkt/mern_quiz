const User = require('../models/User');
const bcrypt = require('bcryptjs');

// REGISTER USER CONTROLLER

// @desc    Registration POST
// @route   POST /users/register
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, password, confirm } = req.body;

  // Basic Validation
  if (!name || !email || !password || !confirm) {
    console.log('Empty Fields');
    return res.status(400).json({
      success: false,
      error: 'Please fill in all fields',
    });
  } else if (password !== confirm) {
    console.log('Password do not match');
    return res
      .status(400)
      .json({ success: false, error: 'Passwords do not match' });
  }

  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      console.log('User already exists');
      return res.status(400).json({
        success: 'false',
        error: 'Email already registered',
      });
    }
    // Create new user instance for User model
    const newUser = new User({
      name,
      email,
      password,
    });
    // Generate Salt and Hash password
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(newUser.password, salt);
    // Update user password to hashed
    newUser.password = hash;

    // Save user into the DB

    const savedUser = await newUser.save();
    return res.status(201).json({
      success: true,
      message: 'You are registered',
    });
  } catch (err) {
    if (err.name === 'ValidationError')
      return res.status(400).json({
        success: false,
        error: err.message,
      });
  }
};
