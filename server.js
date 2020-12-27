import path from 'path'
import dirname from 'es-dirname'
import express from 'express'
import connectDB from './backend/config/db.js'
import dotenv from 'dotenv'
import morgan from 'morgan'
import multer from 'multer'
import checkFileType from './backend/utils/checkFileType.js'

import userRoutes from './backend/routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Allowed JSON Data in the request body
app.use(express.json())

// Routing
app.use('/api/users', userRoutes)

// Multer file upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('image')

app.post('/api/upload', upload, (req, res) => {
  res.send(`/${req.file.path}`)
})

// Static folder for uploads
const __dirname = dirname()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
