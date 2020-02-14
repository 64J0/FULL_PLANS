const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, './.env') });

// Dizamos para o mongoose usar as promises do NodeJS como padrão.
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Conectado ao banco de dados!');
});

mongoose.connection.on('error', (err) => {
    console.log('Erro na conexão: ' + err);
});

mongoose.connection.on('disconnect', () => {
    console.log('Desconectado');
})