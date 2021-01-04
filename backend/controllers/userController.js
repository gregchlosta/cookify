const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')
const cloudinary = require('../config/cloadinary')

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
async function authUser(req, res) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: 'Invalid Credencials' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public
async function registerUser(req, res) {
  const { name, email, password } = req.body
  try {
    const emailExist = await User.findOne({ email })
    const nameExist = await User.findOne({ name })
    if (emailExist) {
      return res
        .status(400)
        .json({ message: 'User with this email already exist' })
    }
    if (nameExist) {
      return res
        .status(400)
        .json({ message: 'User with this username already exist' })
    }
    const user = await User.create({
      name,
      email,
      password,
    })
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete user
// @route   DEL /api/users/delete
// @access  Private
async function deleteUser(req, res) {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user._id)
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
        isAdmin: user.isAdmin,
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update user profile
// @route   POST /api/users/profile
// @access  Private
async function updateUserProfile(req, res) {
  try {
    const user = await User.findById(req.user._id)

    if (user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.imageUrl = req.body.imageUrl || user.imageUrl
      if (req.body.password) {
        user.password = req.body.password
      }

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        imageUrl: updatedUser.imageUrl,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  authUser,
  registerUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
}
