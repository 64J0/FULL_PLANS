const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const projectsController = require("../controllers/projects-controller");

dotenv.config({
  path: path.resolve(__dirname, "../../.env")
});

const router = express.Router();

router.get("/", projectsController.listProjects);
router.post("/", projectsController.createProject);
router.put("/:id", projectsController.updateProject);
router.get("/:id", projectsController.findProjectById);
router.delete("/:id", projectsController.deleteProject);

module.exports = router;
