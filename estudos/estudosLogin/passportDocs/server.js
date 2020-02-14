const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();


/**
 * Conexão com o banco de dados
 */
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

const Schema = mongoose.Schema;

const userSchema = new Schema({

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

});

mongoose.model('User', userSchema);


/**
 * Rotas
 */
app.get('/', (req, res) => {
    res.send('<h1>Página de login</h1>')
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});