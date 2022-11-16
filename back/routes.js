const router = require("express").Router();
const authController = require("./controllers/auth-controller");
const activateController = require("./controllers/activate-controller");
const authMiddleware = require("./middlewares/auth-middleware");

router.post("/api/send-otp", authController.sendOTP);
router.post("/api/verify-otp", authController.verifyOTP);
router.post("/api/activate", authMiddleware, activateController.activate);
router.post("/api/refresh", authController.refresh);
router.post("/api/logout", authMiddleware, authController.logout);

module.exports = router;
