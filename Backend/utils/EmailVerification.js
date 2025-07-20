const OTP = require("../model/otpModel");
const VerifyEmail = async (email, otp) => {
  const date = Date.now();
  const verifyOTP = await OTP.findOne({ email });
  if (otp !== verifyOTP.otp) {
    return { success: false, message: "Incorrect pin!" };
  }
  if (date >= verifyOTP.expiresAt) {
    OTP.deleteOne({ email });
    return { success: false, message: "OTP expired!" };
  }
  OTP.deleteOne({ email });
  return { success: true, message: "OTP verified!" };
};

module.exports = { VerifyEmail };
