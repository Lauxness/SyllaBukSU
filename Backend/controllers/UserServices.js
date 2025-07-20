const Account = require("../model/accountsModel");
const Activity = require("../model/userActivityModel");

const GetUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Account.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    const activities = await Activity.find({ userId: userId }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      user,
      activities,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

module.exports = { GetUser };
