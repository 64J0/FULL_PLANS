const express = require("express");

const router = express.Router();

const path = require("path");
const dotenv = require("dotenv");
const projectsController = require("../controllers/projects-controller");
const verify = require("../middlewares/verifyJWT");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

router.get("/", verify.verifyJWT, projectsController.listProjects);
router.post("/", verify.verifyJWT, projectsController.createProject);
router.put("/:id", verify.verifyJWT, projectsController.updateProject);
router.get("/:id", verify.verifyJWT, projectsController.findProjectById);
router.delete("/:id", verify.verifyJWT, projectsController.deleteProject);

module.exports = router;
