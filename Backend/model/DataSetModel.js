const mongoose = require("mongoose");

const dataSetSchema = new mongoose.Schema(
  {
    college: {
      type: String,
      required: true,
    },
    input: {
      type: String,
      required: true,
    },
    output: {
      type: String,
      required: true,
    },
    component: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("datasets", dataSetSchema);
