const express = require('express');
const app = express();
const db = require('./db.json');
let contacts = db.contacts;
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

morgan.token('dataSent', (req, res) => {
    return JSON.stringify(req.body);
});

app.use(morgan(':method :url HTTP/:http-version :status :res[content-length] - :response-time ms :dataSent'));
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.get('/api/persons', (req, res) => {
    res.json(contacts);
});

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
        res.json(contact);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    contacts = contacts.filter(contact => contact.id !== id);
    let contact = contacts.find(c => c.id === id);
    if (contact.name == "Aayush") {
        return res.status(403).json({ error: 'Cannot delete Aayush' });
    }
    res.status(204).end();
    fs.writeFileSync('./db.json', JSON.stringify({ contacts }, null, 2));
})

app.post('/api/persons', (req, res) => {
    const contact = req.body;
    if (!contact.name || !contact.number) {
        return res.status(400).json({ error: 'name or number is missing' });
    }
    if (contacts.find(c => c.name === contact.name)) {
        return res.status(400).json({ error: 'name must be unique' });
    }
    // Check if id is given
    if (!contact.id) {
        contact.id = (Math.max(...contacts.map(c => c.id)) + 1);
    }
    contacts.push(contact);
    res.json(contact);
    fs.writeFileSync('./db.json', JSON.stringify({ contacts }, null, 2));
});

app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const contact = req.body;
    const index = contacts.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).end();
    } else if (contact.name == "Aayush") {
        return res.status(403).json({ error: 'Cannot update Aayush' });
    }
    contacts[index] = { ...contacts[index], ...contact };
    res.json(contacts[index]);
    fs.writeFileSync('./db.json', JSON.stringify({ contacts }, null, 2));
});

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${contacts.length} people</p><p>${new Date()}</p>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown Endpoint' })
}

app.use(unknownEndpoint)
