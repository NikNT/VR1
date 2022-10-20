const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");

class AuthController {
  async sendOTP(req, res) {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone Number Cannot Be Empty!" });
    }
    const otp = await otpService.generateOtp();
    const ttl = 1000 * 60 * 2; //Time To Live - Expiry Time - 2 Minutes
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);

    //Send OTP
    try {
      await otpService.sendBySms(phone, otp);
      res.json({
        hash: `${hash}.${expires}`,
        phone,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Message Send Failure!" });
    }
  }
}

module.exports = new AuthController();
