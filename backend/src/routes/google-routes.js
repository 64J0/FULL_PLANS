// Essa rota será usada para acessar as funcionalidades relacionadas aos produtos
// do Google (Spreadsheets e Drive)
//
// Quando for clicado em gerar GRD no frontend, o sistema deve criar uma nova planilha
// no Spreadsheets com a numeração correta (numGRD). Essa planilha tera o layout igual
// ao da planilha de GRD anterior, inclusive com os mesmos dados.
//
// A numeração FULL será gerada automaticamente, com base na regra de negócio definida
// pela Marília
const express = require("express");

const router = express.Router();

const createController = require("../controllers/google-api/createController");
const authController = require("../controllers/google-api/authController");
const downloadController = require("../controllers/google-api/downloadController");

// Rota que irá salva a planilha da GRD no Google Drive
// Não será finalizada pois algumas regras de negócio não poderão ser implementadas
// visando melhorar a usabilidade do sistema (Não é possível saber o ID da pasta em
// que uma GRD deve ser salva de antemão).
router.get("/create/:id", createController.create);

// Rota que é responsável por criar o token.json que posteriormente dá autorização
// para fazer as operações no Drive.
router.get("/auth", authController.auth);

// Rota que irá fazer download dos arquivos do Google Drive ZIPADOS e enviar para
// o frontend que por sua vez irá permitir o usuário fazer download.
router.get("/download/:id", downloadController.download);

module.exports = router;
