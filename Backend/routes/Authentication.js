const {
  Login,
  Register,
  GoogleAuth,
  OneTimePinSender,
  FindAccount,
  OTPVerification,
  UpdatePassword,
  SetProgram,
} = require("../controllers/AuthenticationServices");

const express = require("express");
const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/login/google", GoogleAuth);
router.post("/otp", OneTimePinSender);
router.post("/findAccount", FindAccount);
router.post("/verify", OTPVerification);
router.post("/updatepassword", UpdatePassword);
router.patch("/program/:email", SetProgram);

module.exports = router;
