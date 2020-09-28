const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const projectsController = require("../controllers/projects-controller");
const verifyEditPermission = require("../middlewares/verifyEditPermission");

dotenv.config({
  path: path.resolve(__dirname, "../../.env")
});

const router = express.Router();

router.get("/", projectsController.listProjects);
router.post("/", verifyEditPermission, projectsController.createProject);
router.put("/:id", verifyEditPermission, projectsController.updateProject);
router.get("/:id", projectsController.findProjectById);
router.delete("/:id", verifyEditPermission, projectsController.deleteProject);

module.exports = router;
