const { test, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const superTest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const api = superTest(app)
const usersInDb = require('./test_helper').usersInDb

beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekretpass', 10)
    const user = new User({ username: 'root', name: 'Superuser', passkey: passwordHash })
    await user.save()


})

describe('when there is initially one user in db', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = usersInDb;

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await User.find({})
        assert(usersAtEnd.length === usersAtStart.length + 1)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = usersInDb;

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'sekretpass',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('`username` to be unique'))
        const usersAtEnd = usersInDb;
        assert(usersAtEnd.length === usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is missing', async () => {
        const usersAtStart = usersInDb;

        const newUser = {
            name: 'Superuser',
            password: 'sekretpass',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = usersInDb;
        assert(usersAtEnd.length === usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is missing', async () => {
        const usersAtStart = usersInDb;

        const newUser = {
            username: 'root',
            name: 'Superuser',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = usersInDb;
        assert(usersAtEnd.length === usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if username is less than 3 characters', async () => {
        const usersAtStart = usersInDb;

        const newUser = {
            username: 'ro',
            name: 'Superuser',
            password: 'sekretpass',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = usersInDb;
        assert(usersAtEnd.length === usersAtStart.length)
    })

    test('creation fails with proper statuscode and message if password is less than 3 characters', async () => {
        const usersAtStart = usersInDb;

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'se',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('Password must be at least 3 characters long'))
        const usersAtEnd = usersInDb;
        assert(usersAtEnd.length === usersAtStart.length)
    })

    test('login fails with proper statuscode and message if username is missing', async () => {
        const usersAtStart = usersInDb;

        const newUser = {
            password: 'sekretpass',
        }

        const result = await api
            .post('/api/login')
            .send(newUser)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('Invalid username or password'))
        const usersAtEnd = usersInDb;
        assert(usersAtEnd.length === usersAtStart.length)
    })

    test('login fails with proper statuscode and message if password is missing', async () => {
        const usersAtStart = usersInDb;

        const newUser = {
            username: 'root',
        }

        const result = await api
            .post('/api/login')
            .send(newUser)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('Invalid username or password'))
        const usersAtEnd = usersInDb;
        assert(usersAtEnd.length === usersAtStart.length)
    })

    test('Login returns a token if username and password are correct', async () => {
        const usersAtStart = usersInDb;

        const newUser = {
            username: 'root',
            password: 'sekretpass',
        }

        const result = await api
            .post('/api/login')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert(result.body.token)
        const usersAtEnd = usersInDb;
        assert(usersAtEnd.length === usersAtStart.length)
    })
})