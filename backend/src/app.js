// EXPRESS (ROTEAMENTO)
/*
    Chamando o Express e o Mongoose
    O Express é um framwork minimalista capaz de fazer a parte de roteamento da aplicação
    O Mongoose, por sua vez, é um pacote que facilita a modelagem de objetos que serão inseridos no banco de dados do MongoDB
*/
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
/*
    O dotenv é um módulo que não necessita de outras dependências. Este módulo carrega variáveis de ambiente de um arquivo nomeado .env para um arquivo nomeado process.env. Armazenar algumas configurações sensíveis ou secretas em um ambiente separado, como é caso quando é utilizado o dotenv é uma boa prática de programação
*/
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

/*
    Instanciando a aplicação, a variável app receberá uma instância de um objeto do Express()
*/
const app = express();
app.use(cors({}));

/*
    O primeiro comando indica que a instância do Express (app) irá analisar respostas em formato json
    Já o segundo comando especifica que a instância do Express (app) analisará uma requisição codificada no formato x-www
*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
/*
    Middleware que informa alguns dados sobre a conexão com o servidor, como por exemplo, tempo de resposta, qual o verbo HTTP foi solicitado, entre outras informações.
*/
app.use(morgan('dev'));
app.use(helmet());


/* ============================================================================================================ */



// BANCO DE DADOS (DATABASE)
/*
    O mongoose foi utilizado para criar uma conexão com a connection string do banco de dados que passamos via variável de ambiente (process.env.DATABASE_CONNECTION_STRING).
    Também são passadas algumas informações importantes para o funcionamento do mongoose.
*/
mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

/*
    Em seguida recuperamos a instância do mongoose para podermos manipular o que acontece em alguns momentos, como na hora da conexão com o banco de dados (connected), quando a conexão apresenta erro (error), ao desconectar (disconnected) e quando o usuário matar o processo do Node.js (SIGINT)
*/
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

//catches ctrl+c event
/*
    Este trecho de código especifica uma função anônima que será chamada quando o gerenciador do servidor clicar em Ctrl+c, ou seja, quando o processo for terminado pela linha de comando
*/
process.on('SIGINT', () => {
    db.close(() => {
        console.log(
            'Mongoose default connection is disconnected due to application termination'
        );

        process.exit(0);
    });
});

// Load models
/*
    Estes modelos estão associados a como especificamos um objeto que será salvo no banco de dados MongoDB. Neste arquivo está definido o Schema que será salvo na coleção.
*/
require('./models/projeto');
require('./models/user');

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const projetosRoutes = require('./routes/projetos-routes');
app.use('/projetos', projetosRoutes);

const loginRoutes = require('./routes/login-routes');
app.use('/login', loginRoutes);

module.exports = app;