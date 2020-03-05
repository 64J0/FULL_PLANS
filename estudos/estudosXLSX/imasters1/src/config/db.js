var mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

var Schema = mongoose.Schema;

var personSchema = new Schema({
    name: String,
    mail: String,
    role: String
});

var Person = mongoose.model('Person', personSchema);
module.exports = Person;