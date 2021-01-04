const Item = require('../models/itemModel')

// @desc    Fetch all items
// @route   GET /api/items
// @access  Public
async function getItems(req, res) {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const category = req.query.category
    ? {
        category: req.query.category,
      }
    : {}

  try {
    const items = await Item.find({
      ...keyword,
      ...category,
    })
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get looged in user items
// @route   GET /api/items/my
// @access  Private
async function getMyItems(req, res) {
  try {
    const items = await Item.find({ userId: req.user._id })
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get looged in user favorite items
// @route   GET /api/items/favorite
// @access  Private
async function getMyFavoriteItems(req, res) {
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const category = req.query.category
    ? {
        category: req.query.category,
      }
    : {}

  try {
    const items = await Item.find({
      likes: req.user._id,
      ...keyword,
      ...category,
    })
    res.json(items)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Fetch single item
// @route   GET /api/items/:id
// @access  Public
async function getItemById(req, res) {
  try {
    const item = await Item.findById(req.params.id)
    if (item) {
      res.json(item)
    } else {
      res.status(404).json({ message: 'Item not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete a product
// @route   DELETE /api/items/:id
// @access  Private
async function deleteItem(req, res) {
  try {
    const item = await Item.findById(req.params.id)
    if (item) {
      await item.remove()
      res.json({ message: 'Item removed' })
    } else {
      res.status(404).json({ message: 'Item not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create a item
// @route   POST /api/items
// @access  Private
async function createItem(req, res) {
  const {
    title,
    imageUrl,
    servings,
    cookTime,
    instructions,
    ingredients,
    category,
  } = req.body

  try {
    const item = new Item({
      userId: req.user._id,
      userName: req.user.name,
      userImageUrl: req.user.imageUrl,
      title,
      imageUrl,
      servings,
      cookTime,
      instructions,
      ingredients,
      category,
    })

    await item.save()
    res.status(201).json({ message: 'Item added' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update a item
// @route   PUT /api/items/:id
// @access  Private
async function updateItem(req, res) {
  const {
    title,
    imageUrl,
    servings,
    cookTime,
    instructions,
    ingredients,
    category,
  } = req.body

  try {
    const item = await Item.findById(req.params.id)

    if (item) {
      item.userName = req.user.name
      item.userImageUrl = req.user.imageUrl
      item.title = title
      item.imageUrl = imageUrl
      item.servings = servings
      item.cookTime = cookTime
      item.instructions = instructions
      item.ingredients = ingredients
      item.category = category

      await item.save()
      res.status(201).json({ message: 'Item updated' })
    } else {
      res.status(404).json({ message: 'Item not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    like a item
// @route   POST /api/items
// @access  Private
async function likeItem(req, res) {
  try {
    const item = await Item.findById(req.params.id)

    if (item && item.likes.includes(req.user._id)) {
      item.likes = item.likes.filter((like) => req.user._id === like)
      item.numLikes -= 1
    } else if (item && !item.likes.includes(req.user._id)) {
      item.likes.push(req.user._id)
      item.numLikes += 1
    } else {
      res.status(404).json({ message: 'Item not found' })
    }

    await item.save()
    res.status(201).json({ message: 'Like added' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create new comment
// @route   POST /api/items/comment/:id
// @access  Private
async function createComment(req, res) {
  const { text } = req.body

  try {
    const item = await Item.findById(req.params.id)

    if (item) {
      const comment = {
        text,
        userId: req.user._id,
        userName: req.user.name,
        userImageUrl: req.user.imageUrl,
      }
      item.comments.push(comment)
    } else {
      res.status(404).json({ message: 'Item not found' })
    }

    await item.save()
    res.status(201).json({ message: 'Comment added' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getItems,
  getItemById,
  getMyFavoriteItems,
  getMyItems,
  deleteItem,
  createItem,
  updateItem,
  likeItem,
  createComment,
}
