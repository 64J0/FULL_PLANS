const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const db = require("./database");

const app = express();
app.use(cors({}));

// Caminho para os arquivos estáticos
app.use(express.static('public'));

// Indica que a instância do Express (app) irá analisar respostas em formato json
app.use(express.json());

// Especifica que a instância do Express (app) analisará uma requisição codificada
// no formato x-www
app.use(express.urlencoded({ extended: true }));

// Middleware que informa alguns dados sobre a conexão com o servidor, e plota
// esses dados no console, como o prompt de comando, com informações da rota
// requisitada, tempo de resposta, qual o verbo HTTP foi solicitado, entre outras.
app.use(morgan("dev"));

// Helmet é um pacote voltado para segurança das aplicações Express que desabilita
// um conjunto de headers associados a falhas de segurança do site
app.use(helmet());

// O hpp é um middleware que protege contra ataques de poluição de parâmetros HTTP
// (HTTP Parameter Pollution attacks) -> Estudar mais sobre isso
app.use(hpp());

// O cookie parser é um middleware que configura os cookies anexados ao objeto da
// requisição do cliente
app.use(cookieParser());

// Evita DDOS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// BANCO DE DADOS (DATABASE)
if (process.env.NODE_ENV !== "test") {
  db();
}

// MODELS
require("./models/projeto");
require("./models/user");

// ROTAS
const indexRoutes = require("./routes/index-routes");

app.use(indexRoutes);

module.exports = app;
