const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();

// @desc    Registration POST
// @route   POST /users/register
// @access  Public
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Check required fields
  if (!name || !email || !password) {
    console.log('Empty Fields');
    return res
      .status(400)
      .json({ msg: 'Please fill in all fields', status: res.statusCode });
  }
  // Check if user already exists
  User.findOne({ email })
    .then((user) => {
      if (user) return res.status(400).json({ msg: 'User already exists' });
      // Create new user
      let newUser = new User({
        name,
        email,
        password,
      });
      console.log(newUser);
      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) return res.status(400).json({ msg: 'hashing failed' });
          // Update user password to hashed
          newUser.password = hash;
          console.log(hash);
          // Save user to DB
          newUser
            .save()
            .then((user) => {
              return res
                .status(400)
                .json({ msg: 'User registered successfully', user });
            })
            .catch((err) => res.status(400).json({ msg: err.message }));
        });
      });
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
});

module.exports = router;
