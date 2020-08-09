const express = require("express");

const router = express.Router();
const gerarPdfController = require("../controllers/gerarPdf-controller");
const verify = require("../utils/verifyJWT");

router.get("/:id", verify.verifyJWT, gerarPdfController.gerarPdf);

module.exports = router;
