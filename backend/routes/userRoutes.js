import express from 'express'
import {
  authUser,
  registerUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  getUserNameAndPhoto,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)

router.route('/login').post(authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router.route('/delete').delete(protect, deleteUser)
router.route('/:id').get(getUserNameAndPhoto)
export default router
