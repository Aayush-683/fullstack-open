const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.title || !blog.url) return response.status(400).end()
    if (!blog.likes) blog.likes = 0
    const user = request.user
    blog.user = user._id
    blog.author = user.name
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== user.id.toString()) return response.status(403).json({ error: 'Unauthorized' })
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
});

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
    if (blog) response.json(blog)
    else response.status(404).end()
})

blogRouter.put('/:id', async (request, response) => {
    const blog = request.body;
    const user = request.user
    if (!blog.title || !blog.url) return response.status(400).end()
    if (!blog.likes) blog.likes = 0
    if (blog.user.toString() !== user._id.toString()) return response.status(403).json({ error: 'Unauthorized' })
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogRouter