const { Router } = require("express");

const verifyAcl = require("../middlewares/verifyAcl");

const router = Router();

const userControllers = require("../controllers/user-controller");

router.post("/login", userControllers.verifyUser);
router.post("/create", verifyAcl, userControllers.createUser);
router.put("/update/:id", userControllers.updateUser);
router.delete("/delete/:id", verifyAcl, userControllers.deleteUser);
router.post("/list", verifyAcl, userControllers.list);

module.exports = router;
