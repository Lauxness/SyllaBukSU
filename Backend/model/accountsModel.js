const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const { encrypt, decrypt } = require("../utils/Encryption");
const accountsModel = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      set: (value) => encrypt(value),
      get: (value) => decrypt(value),
    },
    program: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    activeUntil: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);
accountsModel.set("toJSON", { getters: true });
module.exports = mongoose.model("accounts", accountsModel);
