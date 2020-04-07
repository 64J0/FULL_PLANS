// EXPRESS (ROTEAMENTO)
/*  Chamando o Express
    O Express é um framwork minimalista capaz de fazer a parte de roteamento da aplicação
*/
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const db = require("./database/index");

// Instanciando a aplicação, a variável app receberá uma instância de um objeto do Express()
const app = express();
app.use(cors({}));

// Indica que a instância do Express (app) irá analisar respostas em formato json
app.use(express.json());

// Especifica que a instância do Express (app) analisará uma requisição codificada no formato x-www
app.use(express.urlencoded({ extended: true }));

/*  Middleware que informa alguns dados sobre a conexão com o servidor, e plota
    esses dados no nosso console, por exemplo o prompt de comando, com informações do tipo, 
    tempo de resposta, qual o verbo HTTP foi solicitado, entre outras.
*/
app.use(morgan("dev"));

// Helmet é um pacote voltado para segurança das aplicações Express que desabilita um conjunto de
// headers associados a falhas de segurança do site
app.use(helmet());

// O hpp é um middleware que protege contra ataques de poluição de parâmetros HTTP
// (HTTP Parameter Pollution attacks)
app.use(hpp());

// O cookie parser é um middleware que configura os cookies anexados ao objeto da
// requisição do cliente
app.use(cookieParser());

// O rateLimit é utilizado para evitar que um usuário consiga fazer várias requisições ao mesmo tempo
// evitando portanto ataques como ddos
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

if (process.env.NODE_ENV !== "test") {
  db();
}

// MODELS
require("./models/projeto");
require("./models/user");

// ROTAS
const indexRoutes = require("./routes/index-routes");

app.use("/", indexRoutes);

const projetosRoutes = require("./routes/projetos-routes");

app.use("/projetos", projetosRoutes);

const loginRoutes = require("./routes/login-routes");

app.use("/login", loginRoutes);

const googleRoutes = require("./routes/google-routes");

app.use("/google", googleRoutes);

// Rota "aposentada", pois a escolha do software da empresa mudou
// const excelGenRoutes = require("./routes/excelGen-routes");
// app.use("/excel", excelGenRoutes);

// const email = require("./routes/email");
// app.use("/email", email);

// Rota para quando o usuário tenta acessar alguma rota que não foi especificada acima
app.route("/*").get((req, res) => {
  return res.status(404).send({ error: "Error 404 - Page not found" });
});

module.exports = app;
