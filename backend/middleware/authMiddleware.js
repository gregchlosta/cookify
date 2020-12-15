import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export async function protect(req, res, next) {
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
