const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

userRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 });
    res.status(200).json(users);
});

userRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).populate('blogs', { title: 1, url: 1, likes: 1});
    if (user) res.json(user);
    else res.status(404).end();
});

userRouter.post('/', async (req, res) => {
        const body = req.body;
        if (!body.username || body.username.length < 3) {
            return res.status(400).json({ error: 'Username must be at least 3 characters long' });
        }
        if (!body.password || body.password.length < 3) {
            return res.status(400).json({ error: 'Password must be at least 3 characters long' });
        }
        const saltRounds = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(body.password, saltRounds);
        const user = new User({
            username: body.username,
            name: body.name,
            passkey: passwordHash
        });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
});

module.exports = userRouter;