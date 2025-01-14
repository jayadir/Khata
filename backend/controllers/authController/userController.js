const user = require("../../models/userModel");
const refreshToken = require("../../models/refreshTokenModel");
const jwtService = require("../../services/jwt");

exports.signup = async (req, res) => {
  try {
    const { username, mobile, password, type } = req.body;
    const newUser = new user({ username, mobile, password, type });
    const response = await newUser.save();
    const { accessTkn, refreshTkn } = await jwtService.generateAccessToken({
      username,
      mobile,
    });
    const token = new refreshToken({ token: refreshTkn, user: response._id });
    await token.save();
    res.cookie("accessTkn", accessTkn, {
      secure: true,
      sameSite: 'none',
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
    });
    res.cookie("refreshTkn", refreshTkn, {
      secure: true,
      sameSite: 'none',
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
    });
    res.status(201).json({
      message: "User created successfully",
      username,
      mobile,
      type,
      userId: response._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const existingUser = await user.findOne({ mobile });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await existingUser.checkPassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { accessTkn, refreshTkn } = await jwtService.generateAccessToken({
      username: existingUser.username,
      mobile,
    });
    await refreshToken.findOneAndUpdate(
      { user: existingUser._id },
      { token: refreshTkn },
      { upsert: true, new: true }
    );
    res.cookie("accessTkn", accessTkn, {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
      sameSite: 'none',
      secure: true,
    });
    res.cookie("refreshTkn", refreshTkn, {
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
      sameSite: 'none',
      secure: true,
    });
    res.status(200).json({
      message: "Login successful",
      username: existingUser.username,
      mobile,
      type: existingUser.type,
      userId: existingUser._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginWithRefreshToken = async (req, res) => {
  try {
    const { refreshTkn } = req.cookies;
    if (!refreshTkn) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = await refreshToken.findOne({ token: refreshTkn });
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userData = await user.findById(token.user);
    const { accessTkn, refreshTkn: newRefreshTkn } =
      await jwtService.generateAccessToken({
        username: userData.username,
        mobile: userData.mobile,
      });
    await refreshToken.findOneAndUpdate(
      { token: refreshTkn },
      { token: newRefreshTkn }
    );
    res.cookie("accessTkn", accessTkn, {
      sameSite: 'none',
      secure: true,
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
    });
    res.cookie("refreshTkn", newRefreshTkn, {
      sameSite: 'none',
      secure: true,
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year in milliseconds
    });
    res.status(200).json({
      message: "Login successful",
      username: userData.username,
      mobile: userData.mobile,
      type: userData.type,
      userId: userData._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    await refreshToken.findOneAndDelete({
      refreshToken: req.cookies.refreshTkn,
    });
    res.clearCookie("refreshTkn");
    res.clearCookie("accessTkn");
    res.status(200).json({ message: "logout success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
