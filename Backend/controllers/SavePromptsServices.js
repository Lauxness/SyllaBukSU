const SavedPrompts = require("../model/savedPromptsModel");
const Accounts = require("../model/accountsModel");

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

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const promptCount = await SavedPrompts.countDocuments({ userId: user._id });
    if (promptCount >= 10) {
      const oldestPrompt = await SavedPrompts.findOne({
        userId: user._id,
      }).sort({ createdAt: 1 });
      if (oldestPrompt) {
        await SavedPrompts.findByIdAndDelete(oldestPrompt._id);
      }
    }

    const newPrompt = {
      userId: user._id,
      variant,
      topic,
      originalResult,
      customizedResults,
      chatPrompts,
      currentResult,
    };

    await SavedPrompts.create(newPrompt);

    res.status(200).json({ message: "Prompt has been saved!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to save prompt" });
  }
};

const GetPrompts = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await Accounts.findOne({ email });
    const prompts = await SavedPrompts.find({ userId: user._id });
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

    console.log(prompts);

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
