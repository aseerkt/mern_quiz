const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('./utils');

// LOGIN USER CONTROLLER

// @desc    Login POST
// @route   POST /users/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Basic Validation
  if (!email || !password) {
    console.log('Empty Fields');
    return res.status(400).json({
      success: false,
      error: 'Please fill in all fields',
    });
  }

  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User does not exists');
      return res.status(400).json({
        success: 'false',
        error: 'Email is not registered',
      });
    }
    // Compare password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        generateToken(res, user._id);
        return res.status(200).json({
          success: true,
          data: {},
        });
      } else {
        return res.status(401).json({
          success: true,
          error: 'Incorrect credentials',
        });
      }
    });
  } catch (err) {
    if (err.name === 'ValidationError')
      return res.status(400).json({
        success: false,
        error: err.message,
      });
    else
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
  }
};
