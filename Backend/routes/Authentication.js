const {
  Login,
  Register,
  GoogleAuth,
  OneTimePinSender,
} = require("../controllers/AuthenticationServices");

const express = require("express");
const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/login/google", GoogleAuth);
router.post("/otp", OneTimePinSender);

module.exports = router;
