const personsRouter = require('express').Router();
const Contact = require('../models/contact');

personsRouter.get('/', (req, res, next) => {
    Contact.find({}).then(result => {
        res.json(result.map(contact => contact.toJSON()));
    }).catch(error => next(error))
});

personsRouter.get('/:id', (req, res, next) => {
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

personsRouter.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    if (id == "666eb877589a0e279dc5b119") return res.json({ error: 'Cannot delete Aayush' });
    Contact.findByIdAndDelete(id).then(result => {
        res.status(204).end();
    }).catch(error => next(error))
})

personsRouter.post('/', (req, res, next) => {
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

personsRouter.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const contact = req.body;
    if (id == "666eb877589a0e279dc5b119") return res.json({ error: 'Cannot update Aayush' });
    Contact.findByIdAndUpdate(id, { number: contact.number }, { new: true, runValidators: true}).then(result => {
        res.json(result.toJSON());
    }).catch(error => next(error));
});

module.exports = personsRouter;