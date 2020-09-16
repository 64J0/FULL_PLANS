const { Router } = require("express");

const userControllers = require("../controllers/user-controller");
const verifyAdmin = require("../middlewares/verifyAdmin");

const router = Router();

router.post("/login", userControllers.verifyUser);
router.post("/create", verifyAdmin, userControllers.createUser);
router.put("/update/:id", userControllers.updateUser);
router.delete("/delete/:id", verifyAdmin, userControllers.deleteUser);
router.post("/list", verifyAdmin, userControllers.list);

module.exports = router;
