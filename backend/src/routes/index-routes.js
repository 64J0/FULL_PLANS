const express = require("express");

const router = express.Router();

const packageJson = require("../../package.json");

const projectsRoutes = require("./projects-routes");
const userRoutes = require("./user-routes");
const excelGenRoutes = require("./excelGen-routes");
// const googleRoutes = require("./google-routes");
const gerarPdfRoutes = require("./gerarPdf-routes");
const emailRoutes = require("./email-routes");

router.use("/projetos", projectsRoutes);
router.use("/user", userRoutes);
router.use("/excel", excelGenRoutes);
// router.use("/google", googleRoutes);
router.use("/generatepdf", gerarPdfRoutes);
router.use("/email", emailRoutes);

// Rota default
router.get("/", (req, res) => {
  res.status(200).send({
    title: "FULL Plans API",
    version: packageJson.version,
  });
});

router.route("/*").get((req, res) => {
  return res.status(404).send({ error: "Error 404 - Content not found" });
});

module.exports = router;
