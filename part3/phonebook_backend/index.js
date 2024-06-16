require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { nextTick } = require('process');
let mongo_uri = process.env.MONGO_URI

// MongoDB
mongoose.set('strictQuery', false)
mongoose.connect(mongo_uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        minLength: [3, 'Name must be at least 3 characters long']
    },
    number: {
        type: String,
        required: [true, 'Phone number is required'],
        min: [8, 'Phone number must be at least 8 digits'],
        max: [12, 'Phone number cannot be more than 11 digits'],
        validate: {
            validator: function(v) {
                return /\d{3}-\d+/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})
const Contact = mongoose.model('Contact', contactSchema)

// Morgan
morgan.token('dataSent', (req, res) => {
    return JSON.stringify(req.body);
});

// Middleware
app.use(morgan(':method :url HTTP/:http-version :status :res[content-length] - :response-time ms :dataSent'));
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('dist'));

// Routes
app.get('/api/persons', (req, res, next) => {
    Contact.find({}).then(result => {
        res.json(result.map(contact => contact.toJSON()));
    }).catch(error => next(error))
});

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Contact.findById(id).then(result => {
        if (result) {
            let contact = result.toJSON();
            contact.id = contact._id;
            delete contact._id;
            delete contact.__v;
            res.json(contact);
        } else res.status(404).json({ error: 'Contact not found' });
    }).catch(error => next(error))
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    if (id == "666eb877589a0e279dc5b119") return res.json({ error: 'Cannot delete Aayush' });
    Contact.findByIdAndDelete(id).then(result => {
        res.status(204).end();
    }).catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const contact = req.body;
    if (!contact.name || !contact.number) return res.json({ error: 'name or number is missing' });
    let newContact = new Contact({
        name: contact.name,
        number: contact.number
    })
    newContact.save().then(result => {
        res.json(result.toJSON());
    }).catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    const contact = req.body;
    if (id == "666eb877589a0e279dc5b119") return res.json({ error: 'Cannot update Aayush' });
    Contact.findByIdAndUpdate(id, { number: contact.number }, { new: true, runValidators: true}).then(result => {
        res.json(result.toJSON());
    }).catch(error => next(error));
});

app.get('/info', (req, res, next) => {
    Contact.find({}).then(result => {
        res.send(`<p>Phonebook has info for ${result.length} people</p><p>${new Date()}</p>`);
    }).catch(error => next(error))
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.json({ error: 'Malformatted ID' })
    } else if (error.name === 'ValidationError') {
        return response.json({ error: error.message })
    }
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown Endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)
