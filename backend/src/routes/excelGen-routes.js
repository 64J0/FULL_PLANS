// Rota para gerar arquivos com os dados do banco de dados
const express = require("express");

const router = express.Router();
const excelGenController = require("../controllers/excel-controller");
const verify = require("../utils/verifyJWT");

router.get("/:id", verify.verifyJWT, excelGenController.genExcelFile);

module.exports = router;
