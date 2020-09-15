const express = require('express');
const { loadUser } = require('../controllers/loadUser');
const { loginUser } = require('../controllers/login');
const { registerUser } = require('../controllers/register');
const { verifyToken } = require('../controllers/utils');

const router = express.Router();

// REGISTER POST ================================================================

// @desc    Registration POST
// @route   POST api/users/register
// @access  Public
router.post('/register', registerUser);

// @desc   Login User
// @route  POST api/users/login
// @access  Public
router.post('/login', loginUser);

// @desc     Get user data
// @route    GET api/users/auth
// @access   Private
router.get('/auth', verifyToken, loadUser);

module.exports = router;
