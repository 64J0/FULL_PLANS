const express = require("express");

const router = express.Router();

const packageJson = require("../../package.json");

const projetosRoutes = require("./projetos-routes");
const loginRoutes = require("./login-routes");
const googleRoutes = require("./google-routes");
const excelGenRoutes = require("./excelGen-routes");

router.use("/projetos", projetosRoutes);
router.use("/login", loginRoutes);
router.use("/google", googleRoutes);
router.use("/excel", excelGenRoutes);

router.get("/", (req, res) => {
  res.status(200).send({
    title: "FULL Plans API",
    version: packageJson.version,
  });
});

router.route("/*").get((req, res) => {
  return res.status(404).send({ error: "Error 404 - Page not found" });
});

module.exports = router;
