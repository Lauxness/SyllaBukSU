const random = require("random-string-alphanumeric-generator");
const { SendEmail } = require("./EmailSender");
const OTP = require("../model/otpModel");
const OTPHelper = async (email, res) => {
  const emailTestRegex = new RegExp(process.env.EMAIL_TEST);
  if (!(email && emailTestRegex.test(email))) {
    console.log(!(email && emailTestRegex.test(email)));
    return res.status(400).json({ message: "Email Address is not valid" });
  }

  const pin = random.randomAlphanumeric(6, "lowercase");
  await OTP.deleteOne({ email });
  console.log(pin);
  const response = await SendEmail(email, pin, "One Time Pin");
  const otpInfo = {
    email,
    otp: pin,
    createdAt: Date.now(),
    expiresAt: Date.now() + 600000,
  };
  const newOTP = await OTP.create(otpInfo);
  return newOTP;
};

module.exports = { OTPHelper };
