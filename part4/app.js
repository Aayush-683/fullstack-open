require('express-async-errors');
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogRouter')
const loginRouter = require('./controllers/loginRouter')
const userRouter = require('./controllers/userRouter')
const testRouter = require('./controllers/testRouter')
const getToken = require('./middleware/tokenExtractor')
const errorHandler = require('./middleware/errorHandler')
const mongoose = require('mongoose')
const config = require('./utils/config')

mongoose.connect(config.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())

app.use('/api/testing', testRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use('/api/blogs', getToken, blogRouter)

app.use(errorHandler)

module.exports = app