const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { encrypt, decrypt } = require("../utils/Encryption");
const OTPSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  otp: {
    type: String,
    set: (value) => encrypt(value),
    get: (value) => decrypt(value),
  },
  createdAt: Date,
  expiresAt: Date,
});
OTPSchema.set("toJSON", { getters: true });
module.exports = mongoose.model("OTP", OTPSchema);
