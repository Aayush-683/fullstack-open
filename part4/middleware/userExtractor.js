const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userExtractor = async (req, res, next) => {
    const decodedToken = jwt.verify(req.token, config.SECRET)
    if (!decodedToken.id) return res.status(401).json({ error: 'Token missing or invalid' })
    req.user = await User.findById(decodedToken.id)
    next()
};

module.exports = userExtractor;