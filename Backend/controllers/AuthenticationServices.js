const Accounts = require("../model/accountsModel");
const jwt = require("jsonwebtoken");
const { oauth2Client } = require("../utils/GoogleClient");
const Activity = require("../model/userActivityModel");

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
    const activeUntil = new Date(Date.now() + 12 * 60 * 60 * 1000);
    account.activeUntil = activeUntil;
    await account.save();
    const userPayload = {
      name: account.name,
      email: account.email,
      role: account.role,
      ...(account.program && { program: account.program }),
    };
    const JWT_KEY = process.env.JWT_KEY;
    const token = jwt.sign(userPayload, JWT_KEY, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    await Activity.create({
      userId: account._id,
      action: "User has successfully logged in.",
      component: "Login",
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
    newAccount.role = "user";
    const createdAccount = await Accounts.create(newAccount);
    if (createdAccount) {
      return res.status(200).json({ message: "Account successfully created!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
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
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name } = userRes.data;
    const currentUser = await Accounts.findOne({ email });

    if (!currentUser) {
      const emailTestRegex = new RegExp(process.env.EMAIL_TEST);

      if (!(email && emailTestRegex.test(email))) {
        return res.status(400).json({ message: "Email Address is not valid" });
      }
      const newAccount = { name: name, email: email, password: "123" };
      newAccount.role = "user";
      const createdAccount = await Accounts.create(newAccount);
      if (!createdAccount) {
        return res.status(400).json({ message: "Account creation failed!" });
      }
    }
    const activeUntil = new Date(Date.now() + 12 * 60 * 60 * 1000);
    currentUser.activeUntil = activeUntil;
    currentUser.name = name;
    await currentUser.save();
    const userPayload = {
      email: currentUser.email || email,
      name: currentUser.name || name,
      role: currentUser.role,
      ...(currentUser.program && { program: currentUser.program }),
    };
    const token = jwt.sign(userPayload, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    await Activity.create({
      userId: currentUser._id,
      action: "Logged in",
      component: "Login",
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

  try {
    const account = await Accounts.findOne({ email });
    if (account) {
      return res.status(409).json({ message: "Email Address already exist!" });
    }
    const newOTP = await OTPHelper(email, res);

    return res
      .status(200)
      .json({ message: "OTP sent, Please check your email!" });
  } catch (err) {
    console.log(err);
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

const SetProgram = async (req, res) => {
  const email = req.params.email;
  const { program, department, college } = req.body;
  try {
    const account = await Accounts.findOne({ email });

    if (!account) {
      return res.status(404).json({ message: "Account not found." });
    }
    account.program = program;
    account.department = department;
    account.college = college;
    await account.save();

    return res.status(200).json({ message: "Program successfully set!" });
  } catch (err) {
    console.error("Error setting program:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const CreateAdminAccount = async (req, res) => {
  const { email, role, college } = req.body;
  try {
    const existingAccount = await Accounts.findOne({ email });
    if (existingAccount) {
      existingAccount.college = college;
      existingAccount.role = role;
      await existingAccount.save();
      return res
        .status(200)
        .json({ message: "Account role updated successfully!" });
    }
    const newAccount = await Accounts.create({ email, role, college });
    return res.status(200).json({ message: "Account successfully created!" });
  } catch (err) {
    console.log(err);
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
  SetProgram,
  CreateAdminAccount,
};
