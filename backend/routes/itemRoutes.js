import express from 'express'
import {
  getItems,
  getItemById,
  createItem,
  likeItem,
  createComment,
  getMyItems,
  getMyFavoriteItems,
  deleteItem,
  updateItem,
} from '../controllers/itemController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getItems).post(protect, createItem)
router.route('/my').get(protect, getMyItems)
router.route('/favorite').get(protect, getMyFavoriteItems)
router
  .route('/:id')
  .get(getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem)
router.route('/like/:id').post(protect, likeItem)
router.route('/comment/:id').post(protect, createComment)

export default router
