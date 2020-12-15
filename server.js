import express from 'express'
import connectDB from './backend/config/db.js'
import dotenv from 'dotenv'
import userRoutes from './backend/routes/userRoutes.js'

// to start the server type in terminal npm run dev

dotenv.config()

connectDB()

const app = express()

// Allowed JSON Data in the request body
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Done Deals API is running...')
})

app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
