const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../utils/config')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })
    if (!user || !body.password) {
        return response.status(401).json({ error: 'Invalid username or password' })
    }
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passkey)
    if (!(user && passwordCorrect)) {
        return response.status(401).json({ error: 'Invalid username or password' })
    }
    
    const userForToken = {
        username: user.username,
        id: user._id
    }
    const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 })
    response.status(200).send({ token, username: user.username, name: user.name })
});

module.exports = loginRouter