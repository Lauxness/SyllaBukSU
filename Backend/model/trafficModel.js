const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trafficModel = Schema(
  {
    origin: {
      type: String,
      required: true,
    },
    requestName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("traffic", trafficModel);
