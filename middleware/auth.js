const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token, access denied'
      });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.status(401).json({
        success: false,
        message: 'Token verification failed, access denied'
      });
    }

    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token, access denied'
    });
  }
};

module.exports = auth;