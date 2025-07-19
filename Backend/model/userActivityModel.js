const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accounts",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    component: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("activity", activitySchema);
