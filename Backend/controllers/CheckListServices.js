const CheckList = require("../model/checklistModel");
const Account = require("../model/accountsModel");

const GetCheckList = async (req, res) => {
  const userEmail = req.user.email;
  if (!userEmail) {
    return res.status(400).json({ message: "User email is missing" });
  }
  try {
    const user = await Account.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const checkList = await CheckList.find({ userId: user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(checkList);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server Error!" });
  }
};
const GetOneCheckList = async (req, res) => {
  const userEmail = req.user.email;
  const checkListId = req.params.id;
  try {
    const user = await Account.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const checkList = await CheckList.findById({ _id: checkListId });
    if (!checkList) {
      return res.status(404).json({ message: "Check list not found!" });
    }
    return res.status(200).json(checkList);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server Error!" });
  }
};

const AddCheckList = async (req, res) => {
  const userEmail = req.user.email;

  const data = req.body;
  console.log(data);
  if (!userEmail) {
    return res.status(400).json({ message: "User email is missing!" });
  }
  try {
    const user = await Account.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ message: "No user found!" });
    }
    data.userId = user._id;
    await CheckList.create(data);
    return res.status(200).json({ message: "New checkList has been created!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const UpdateCheckList = async (req, res) => {
  const checklistId = req.params.id;
  const updateData = req.body;

  if (!checklistId) {
    return res.status(400).json({ message: "Checklist ID is required!" });
  }

  try {
    const updatedChecklist = await CheckList.findByIdAndUpdate(
      checklistId,
      updateData,
      { new: true }
    );

    if (!updatedChecklist) {
      return res.status(404).json({ message: "Checklist not found!" });
    }

    return res.status(200).json({
      message: "Checklist updated successfully!",
      checklist: updatedChecklist,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
const DeleteCheckList = async (req, res) => {
  const checklistId = req.params.id;

  if (!checklistId) {
    return res.status(400).json({ message: "Checklist ID is required!" });
  }

  try {
    const deletedChecklist = await CheckList.findByIdAndDelete(checklistId);

    if (!deletedChecklist) {
      return res.status(404).json({ message: "Checklist not found!" });
    }

    return res.status(200).json({ message: "Checklist deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

module.exports = {
  GetCheckList,
  AddCheckList,
  UpdateCheckList,
  DeleteCheckList,
  GetOneCheckList,
};
