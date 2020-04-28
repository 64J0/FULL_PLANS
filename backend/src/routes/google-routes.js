// Essa rota será usada para acessar as funcionalidades relacionadas aos produtos
// do Google (Spreadsheets e Drive)
//
// Quando for clicado em gerar GRD no frontend, o sistema deve criar uma nova planilha
// no Spreadsheets com a numeração correta (numGRD). Essa planilha tera o layout igual
// ao da planilha de GRD anterior, inclusive com os mesmos dados.
//
// A numeração FULL será gerada automaticamente, com base na regra de negócio definida
// pela Marília
//
// Deverá ter uma rota para baixar os arquivos de um projeto, no Drive (zipado) automa-
// ticamente.
const express = require("express");

const router = express.Router();

const createController = require("../controllers/google-api/createController");
const authController = require("../controllers/google-api/authController");

// Rota que irá criar a planilha da GRD
//
// Será devolvido pro frontend um link para a planilha com os dados do projeto
// Com esse link o frontend deve criar uma nova aba no navegador do usuário e redirecionar
// para esse caminho da planilha
router.get("/create/:id", createController.create);

router.get("/auth", authController.auth);

// Rota que irá fazer download dos arquivos do Google Drive ZIPADOS e enviar para
// o frontend
router.get("/files/:id");

module.exports = router;
