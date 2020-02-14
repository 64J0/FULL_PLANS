const express = require('express');
// Gera logs sobre a aplicação que estiver rodando
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const routes = require('./routes');

const app = express();

/**
 * Database setup
 */
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
    '/files', 
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'
)));

app.use('/', routes);


const port = 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});