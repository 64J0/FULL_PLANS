const express = require("express");

const excelGenController = require("../controllers/excel-controller");

const router = express.Router();

router.get("/:id", excelGenController.genExcelFile);

module.exports = router;
