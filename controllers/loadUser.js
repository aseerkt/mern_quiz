const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.loadUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }
  User.findById(req.user.id)
    .select('-password')
    .then((user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          data: {
            user,
          },
        });
      }
    });
};
