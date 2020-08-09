const express = require("express");

const router = express.Router();

const path = require("path");
const dotenv = require("dotenv");
const projetosController = require("../controllers/projetos-controller");
const verify = require("../utils/verifyJWT");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

router.get("/", verify.verifyJWT, projetosController.listProjeto);
router.post("/", verify.verifyJWT, projetosController.createProjeto);
router.put("/:id", verify.verifyJWT, projetosController.updateProjeto);
router.delete("/:id", verify.verifyJWT, projetosController.deleteProjeto);
router.get("/:id", verify.verifyJWT, projetosController.findProjetoById);

module.exports = router;
