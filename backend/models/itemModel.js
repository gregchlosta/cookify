import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    userName: { type: String, required: true },
    userImageUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const ingredientSchema = mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: String, required: true },
})

const itemSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    userName: { type: String, required: true },
    userImageUrl: { type: String, required: true },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: '/img/item-default.jpg',
    },
    servings: {
      type: Number,
      required: true,
    },
    cookTime: {
      type: Number,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
    },
    ingredients: [ingredientSchema],
    comments: [commentSchema],
    likes: [String],
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Item = mongoose.model('Items', itemSchema)

export default Item
