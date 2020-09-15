const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.generateToken = (res, id) => {
  const expiration = process.env.NODE_ENV === 'development' ? 3600 : 604800000;
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.NODE_ENV === 'development' ? '1d' : '7d',
  });

  return res.cookie('token', token, {
    maxAge: new Date(Date.now() + expiration),
    secure: false,
    httpOnly: true,
  });
};

exports.verifyToken = async (req, res) => {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      return;
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
