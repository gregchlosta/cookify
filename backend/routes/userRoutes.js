const express = require('express')
const {
  authUser,
  registerUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  passwordReset,
} = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(registerUser)

router.route('/login').post(authUser)
router.route('/reset').post(passwordReset)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/delete').delete(protect, deleteUser)

module.exports = router
