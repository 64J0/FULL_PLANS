const { Router } = require("express");
const authController = require("../controllers/authController");
const createController = require("../controllers/createController");

const routes = Router();

routes.get("/auth", authController.auth);
routes.get("/create", createController.create);

module.exports = routes;
