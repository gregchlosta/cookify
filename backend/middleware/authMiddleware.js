const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

async function protect(req, res, next) {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' })
  }

  next()
}

module.exports = protect
