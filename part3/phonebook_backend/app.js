const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const { info, err } = require('./utils/logger');
const personsRouter = require('./controller/persons');
const middleware = require('./utils/middleware');

// MongoDB
mongoose.set('strictQuery', false)
mongoose.connect(config.MONGO_URI)
    .then(() => info('Connected to MongoDB'))
    .catch((error) => err('Error connecting to MongoDB:', error.message));

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(express.json());
app.use(express.static('dist'));
app.use(cors(corsOptions));
app.use(middleware.requestLogger);

// Routes
app.use('/api/persons', personsRouter);

app.use((error, request, response, next) => {
    middleware.errorHandler(error, request, response, next);
});

app.use(middleware.unknownEndpoint);

module.exports = app;