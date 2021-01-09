const path = require('path')
const express = require('express')
const connectDB = require('./backend/config/db')
const dotenv = require('dotenv')
const morgan = require('morgan')

const userRoutes = require('./backend/routes/userRoutes')
const itemRoutes = require('./backend/routes/itemRoutes')

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
app.use('/api/items', itemRoutes)

// Production settings
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

// Server initialization
const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
