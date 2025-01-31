const Accounts = require("../model/accountsModel");
const jwt = require("jsonwebtoken");
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
    return res.status(200).json(token);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const Register = async (req, res) => {
  const newAccount = req.body;
  const { email } = newAccount;
  console.log(email);
  try {
    const account = await Accounts.findOne({ email });
    if (account) {
      return res.status(409).json({ message: "Email Address already exist!" });
    }
    const emailTestRegex = new RegExp(process.env.EMAIL_TEST);

    if (!(email && emailTestRegex.test(email))) {
      console.log(!(email && emailTestRegex.test(email)));
      return res.status(400).json({ message: "Email Address is not valid" });
    }
    const createdAccount = await Accounts.create(newAccount);
    if (createdAccount) {
      return res.status(200).json({ message: "Account successfully created!" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { Login, Register };
