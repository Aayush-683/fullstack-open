const superTest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper')
const { beforeEach, test, describe } = require('node:test')
const assert = require('node:assert')

const api = superTest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

describe('when there are initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all blogs are returned', async () => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('blogs have the \'id\' identifier', async () => {
        const response = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        response.body.forEach(blog => assert(blog.id));
    });

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'New blog',
            author: 'New author',
            url: 'http://newblog.com',
            likes: 0
        };
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const response = await api.get('/api/blogs').expect(200)
        const titles = response.body.map(blog => blog.title);
        assert(titles.includes(newBlog.title));
    });

    test('a blog without likes will default to 0 likes', async () => {
        const newBlog = {
            title: 'New blog',
            author: 'New author',
            url: 'http://newblog.com'
        };
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs').expect(200)
        const blog = response.body.find(blog => blog.title === newBlog.title);
        assert(blog.likes === 0);
    });

    test('a blog without title or url will return 400 Bad Request', async () => {
        const newBlog = {
            title: 'New blog',
            author: 'New author'
        };
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400);
    });

    test('a blog can be deleted', async () => {
        const response = await api.get('/api/blogs').expect(200);
        const blogToDelete = response.body[0];
        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
        const blogsAtEnd = await api.get('/api/blogs').expect(200);
        assert(blogsAtEnd.body.length === helper.initialBlogs.length - 1);
    });

    test('a blog can be updated', async () => {
        const response = await api.get('/api/blogs').expect(200);
        const blogToUpdate = response.body[0];
        const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
        await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200);
        const blogsAtEnd = await api.get('/api/blogs').expect(200);
        const updated = blogsAtEnd.body.find(blog => blog.id === blogToUpdate.id);
        assert(updated.likes === updatedBlog.likes);
    });
});