const Accounts = require("../model/accountsModel");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../utils/GoogleClient");
const axios = require("axios");
const { VerifyEmail } = require("../utils/EmailVerification");
const { OTPHelper } = require("../utils/OTPHelper");
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const account = await Accounts.findOne({ email });
    console.log(account);
    if (!account) {
      return res.status(404).json({ message: "Invalid Email or Password" });
    }
    if (password !== account.password) {
      return res.status(404).json({ message: "Invalid Email or Password" });
    }
    const userPayload = {
      name: account.name,
      email: account.email,
    };
    const JWT_KEY = process.env.JWT_KEY;
    const token = jwt.sign(userPayload, JWT_KEY, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    return res.status(200).json({ token, userPayload });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const Register = async (req, res) => {
  const newAccount = req.body;
  const { email, otpValue } = newAccount;
  try {
    const result = await VerifyEmail(email, otpValue);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    const createdAccount = await Accounts.create(newAccount);
    if (createdAccount) {
      return res.status(200).json({ message: "Account successfully created!" });
    }
  } catch (err) {
    console.log(err);
  }
};
const GoogleAuth = async (req, res) => {
  const code = req.query.code;
  console.log(code);
  if (!code) {
    return res.status(404).json({ message: "Code not Found!" });
  }
  console.log(code);
  try {
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);
    console.log(googleRes);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    console.log(userRes);
    const { email, name } = userRes.data;
    const currentUser = await Accounts.findOne({ email });

    if (!currentUser) {
      const emailTestRegex = new RegExp(process.env.EMAIL_TEST);

      if (!(email && emailTestRegex.test(email))) {
        console.log(!(email && emailTestRegex.test(email)));
        return res.status(400).json({ message: "Email Address is not valid" });
      }
      const newAccount = { name: name, email: email, password: "123" };
      const createdAccount = await Accounts.create(newAccount);
      if (!createdAccount) {
        return res.status(400).json({ message: "Account creation failed!" });
      }
    }
    const userPayload = {
      email: currentUser.email || email,
      name: currentUser.name || name,
    };
    const token = jwt.sign(userPayload, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_TIMEOUT,
    });

    return res.status(200).json({
      token,
      userPayload,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
const OneTimePinSender = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  try {
    const account = await Accounts.findOne({ email });
    if (account) {
      return res.status(409).json({ message: "Email Address already exist!" });
    }
    const newOTP = await OTPHelper(email);
    return res
      .status(200)
      .json({ message: "OTP sent, Please check your email!" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const FindAccount = async (req, res) => {
  const { email } = req.body;
  try {
    const existingAccount = await Accounts.findOne({ email });
    if (!existingAccount) {
      return res.status(404).json({ message: "Account did not exist!" });
    }
    const newOTP = await OTPHelper(email);
    return res
      .status(200)
      .json({ message: "OTP sent, Please check your email!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const OTPVerification = async (req, res) => {
  const { otpValue, email } = req.body;
  if (!otpValue) {
    return res.status(400).json({ message: "OTP is missing!" });
  }
  try {
    const result = await VerifyEmail(email, otpValue);
    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }
    return res.status(200).json({ message: "Email Verification Success!" });
  } catch (err) {
    console.log(err);
  }
};
const UpdatePassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAccount = await Accounts.findOne({ email });
    if (!existingAccount) {
      return res.status(404).json({ message: "Account did not exist!" });
    }
    existingAccount.password = password;
    await existingAccount.save();
    return res
      .status(200)
      .json({ message: "Password has been successfully updated!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
module.exports = {
  Login,
  Register,
  GoogleAuth,
  OneTimePinSender,
  FindAccount,
  OTPVerification,
  UpdatePassword,
};
