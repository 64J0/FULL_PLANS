const { Router } = require("express");
const createRoutes = require("./createFile.routes");

const routes = Router();

routes.get("/test", (request, response) => {
  return response.status(200).json({ ok: true });
});

routes.use("/google", createRoutes);

module.exports = routes;
