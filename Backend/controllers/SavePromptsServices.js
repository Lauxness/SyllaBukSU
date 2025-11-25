const SavedPrompts = require("../model/savedPromptsModel");
const Accounts = require("../model/accountsModel");

const Activity = require("../model/userActivityModel");
const SavePrompt = async (req, res) => {
  const userEmail = req.user.email;

  const {
    topic,
    variant,
    originalResult,
    customizedResults,
    chatPrompts,
    currentResult,
  } = req.body;

  try {
    const user = await Accounts.findOne({ email: userEmail });

    const data = {
      userId: user._id,
      variant,
      topic,
      originalResult,
      customizedResults,
      chatPrompts,
      currentResult,
    };
    const result = await SavedPrompts.create(data);
    await Activity.create({
      userId: user._id,
      action: "User has saved a prompt",
      component: "Save prompt",
    });
    res.status(200).json({ message: "Prompts has been saved!" });
  } catch (err) {
    console.log(err);
  }
};

const GetPrompts = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await Accounts.findOne({ email });
    const prompts = await SavedPrompts.find({ userId: user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(prompts);
  } catch (err) {
    console.log(err);
    err;
  }
};

const GetPrompt = async (req, res) => {
  const id = req.params.id;
  try {
    const prompts = await SavedPrompts.findById(id);

    res.status(200).json(prompts);
  } catch (err) {
    console.log(err);
    err;
  }
};

const DeletePrompt = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await SavedPrompts.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Prompt not found" });
    }

    res.status(200).json({ message: "Prompt deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete prompt" });
  }
};

module.exports = { SavePrompt, GetPrompts, GetPrompt, DeletePrompt };
