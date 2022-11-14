const router = require("express").Router();
const authController = require("./controllers/auth-controller");
const activateController = require("./controllers/activate-controller");
const authMiddleware = require("./middlewares/auth-middleware");

router.post("/api/send-otp", authController.sendOTP);
router.post("/api/verify-otp", authController.verifyOTP);
router.post("/api/activate", authMiddleware, activateController.activate);

module.exports = router;
