const otpService = require("../services/otp-service");
const hashService = require("../services/hash-service");
const userService = require("../services/user-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");

class AuthController {
  async sendOTP(req, res) {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone Number Cannot Be Empty!" });
    }
    const otp = await otpService.generateOtp();
    const ttl = 1000 * 60 * 2; //Time To Live - Expiry Time - 2 Minutes
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = hashService.hashOtp(data);
    //Send OTP
    try {
      // await otpService.sendBySms(phone, otp);
      return res.json({
        hash: `${hash}.${expires}`,
        phone,
        otp,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Message Send Failure!" });
    }
  }

  async verifyOTP(req, res) {
    //Logic for Verification
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "All Fields are Required!" });
    }

    const [hashedOTP, expires] = hash.split(".");
    if (Date.now() > +expires) {
      res.status(400).json({ message: "OTP Expired!" });
    }

    const data = `${phone}.${otp}.${expires}`;
    const isValid = otpService.verifyOtp(hashedOTP, data);

    if (!isValid) {
      res.status(400).json({ message: "Invalid OTP" });
    }

    let user;

    try {
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "DB Error!" });
    }

    //Tokens
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });

    tokenService.storeRefreshToken(refreshToken, user._id);

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDTO = new UserDto(user);
    res.json({ user: userDTO, auth: true });
  }

  async refresh(req, res) {
    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );

      if (!token) {
        return res.status(401).json({ message: "Invalid Token" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal Error!" });
    }

    const user = await userService.findUser({ _id: userData._id });
    if (!user) {
      return res.status(404).json({ message: "No User" });
    }

    const { refreshToken, accessToken } = tokenService.generateTokens({
      _id: userData._id,
    });

    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "Internal Error!" });
    }
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    const userDTO = new UserDto(user);
    res.json({ user: userDTO, auth: true });
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;
    await tokenService.removeToken(refreshToken);
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ user: null, auth: false });
  }
}

module.exports = new AuthController();
