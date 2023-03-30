const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000


connectDB()

const app = express()

app.use(express.json())

/**
 * In Postman, x-www-form-urlencoded is clicked*
 * with Key: test & Value: First User
 * Tested with the POST: Set a User
 * printed in the terminal
 */
app.use(express.urlencoded({ extended: false }))

/**
 * The URL can only be accessed by the '/api/classes'
 */
app.use('/api', require('./routes/classRoutes'))
app.use('/api', require('./routes/userRoutes'))
app.use('/api', require('./routes/groupRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Server has started on port ${port}`))
