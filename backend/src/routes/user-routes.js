const { Router } = require("express");

const verifyAdmin = require("../middlewares/verifyAdmin");

const router = Router();

const userControllers = require("../controllers/user-controller");

router.post("/login", userControllers.verifyUser);
router.post("/create", verifyAdmin, userControllers.createUser);
router.put("/update/:id", userControllers.updateUser);
router.delete("/delete/:id", verifyAdmin, userControllers.deleteUser);
router.get("/list", verifyAdmin, userControllers.list);

module.exports = router;
