const mongoose = require('mongoose');
require('dotenv').config();
let mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri);
const contactSchema = new mongoose.Schema({
    name: String,
    number: String
});
const Contact = mongoose.model('Contact', contactSchema);
let args = process.argv;
if (args.length !== 4 && args.length !== 2) {
    console.log('Passed arguments are less than 2, need name and number');
    mongoose.connection.close();
    process.exit(1);
} else if (args.length === 4) {
    new Contact({ name: args[2], number: args[3] }).save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    }).catch(error => {
        console.log(error);
    });
} else {
    Contact.find({}).then(result => {
        console.log('Phonebook:');
        result.forEach(contact => {
            console.log(contact.name, contact.number);
        });
        mongoose.connection.close();
    }).catch(error => {
        console.log(error);
    });
}