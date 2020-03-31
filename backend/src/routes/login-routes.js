const { Router } = require("express");

const router = Router();

const loginControllers = require("../controllers/login-controller");

router.post("/", loginControllers.verifyUser);
// router.post("/create", loginControllers.create);
// router.get('/', loginControllers.list);

module.exports = router;
