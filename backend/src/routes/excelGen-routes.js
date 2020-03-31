// Rota para gerar arquivos com os dados do banco de dados
const express = require("express");

const router = express.Router();
const excelGenController = require("../controllers/excel-controller");

router.get("/:id", excelGenController.genExcelFile);

module.exports = router;
