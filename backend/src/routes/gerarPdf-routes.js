const express = require("express");

const gerarPdfController = require("../controllers/gerarPdf-controller");

const router = express.Router();

router.get("/:id", gerarPdfController.gerarPdf);

module.exports = router;
