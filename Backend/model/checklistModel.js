const mongoose = require("mongoose");

const checklistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "accounts",
      required: true,
    },
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    formatAndHouseStylesPart: {
      type: Array,
      required: true,
      default: [0, 0, 0, 0, 0, 0, 0],
    },
    coherenceAndLogicalConnectionPart: {
      type: Array,
      default: [0, 0, 0, 0, 0, 0],
    },
    behavioralVerbsPart: {
      type: Array,
      default: [0, 0],
    },
    gradationOfOutComesPart: {
      type: Array,
      default: [0, 0, 0, 0, 0],
    },
    supplementaryDocumentationPart: {
      type: Array,
      default: [0, 0, 0, 0],
    },
    institutionalFormsPart: {
      type: Array,
      default: [0, 0, 0],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("checklist", checklistSchema);
