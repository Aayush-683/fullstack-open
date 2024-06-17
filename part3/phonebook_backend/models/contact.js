const mongoose = require('mongoose');

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
        validate: {
            validator: function(v) {
                return /\+\d{1,2}\s\d{3}-\d{7}/.test(v);
            },
            message: props => `${props.value} is not in valid format (+XX XXX-XXXXXXX)`
        }
    }
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
    }
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;