const express = require("express");

const packageJson = require("../../package.json");
const projectsRoutes = require("./projects-routes");
const userRoutes = require("./user-routes");
const excelRoutes = require("./excel-routes");
const gerarPdfRoutes = require("./gerarPdf-routes");
const emailRoutes = require("./email-routes");

const { verifyJWT } = require("../middlewares/verifyJWT");

const router = express.Router();

// Rota default
router.get("/", (req, res) => {
  res.status(200).send({
    title: "FULL Plans API",
    version: packageJson.version,
  });
});

router.use("/user", userRoutes);

router.use("/projetos", verifyJWT, projectsRoutes);
router.use("/excel", verifyJWT, excelRoutes);
router.use("/generatepdf", verifyJWT, gerarPdfRoutes);
router.use("/email", verifyJWT, emailRoutes);

router.route("/*").get((req, res) => {
  return res.status(404).send({ error: "Error 404 - Content not found" });
});

module.exports = router;
