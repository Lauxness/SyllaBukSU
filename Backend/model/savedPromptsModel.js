const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const savedPromptsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
      required: true,
    },
    variant: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    originalResult: {
      type: Schema.Types.Mixed,
      required: true,
    },
    customizedResults: {
      type: [String],
      required: false,
    },
    currentResult: {
      type: Schema.Types.Mixed,
      required: true,
    },
    chatPrompts: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("savedPrompts", savedPromptsSchema);
