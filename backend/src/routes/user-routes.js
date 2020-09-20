const { Router } = require("express");

const userControllers = require("../controllers/user-controller");
const verifyAdmin = require("../middlewares/verifyAdmin");
const { verifyJWT } = require("../middlewares/verifyJWT");

const router = Router();

router.post("/login", userControllers.verifyUser);
router.post("/create", verifyJWT, verifyAdmin, userControllers.createUser);
router.put("/update/:id", verifyJWT, userControllers.updateUser);
router.delete("/delete/:id", verifyJWT, verifyAdmin, userControllers.deleteUser);
router.post("/list", verifyJWT, verifyAdmin, userControllers.list);

module.exports = router;
