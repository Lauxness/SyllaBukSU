const Datasets = require("../model/DataSetModel");
const Account = require("../model/accountsModel");
const GetDatasets = async (req, res) => {
  const user = req.user;
  console.log(user);
  try {
    const currentUser = await Account.findOne({ email: user.email });
    if (currentUser.role !== "admin") {
      const datasets = await Datasets.find({ college: currentUser.college });
      return res.status(200).json(datasets);
    }
    const datasets = await Datasets.find().sort({ createdAt: -1 });
    return res.status(200).json(datasets);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const AddDataset = async (req, res) => {
  const dataset = req.body;
  const user = req.user;
  try {
    const currentUser = await Account.findOne({ email: user.email });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    const newDataset = { ...dataset, college: currentUser.college };
    console.log(currentUser);
    const addedDataset = await Datasets.create(newDataset);

    if (!addedDataset) {
      return res
        .status(400)
        .json({ message: "Something went wrong in adding the dataset!" });
    }
    return res.status(200).json({ message: "New dataset successfully added!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server Error" });
  }
};
const UpdateDataset = async (req, res) => {
  const dataset = req.body;
  const id = req.params.id;

  try {
    const updatedDataset = await Datasets.findByIdAndUpdate(id, dataset, {
      new: true,
    });

    if (!updatedDataset) {
      return res.status(404).json({ message: "Dataset not found" });
    }

    return res.status(200).json({
      message: "Dataset updated successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const DeleteDataset = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedDataset = await Datasets.findByIdAndDelete(id);

    if (!deletedDataset) {
      return res.status(404).json({ message: "Dataset not found" });
    }

    return res.status(200).json({
      message: "Dataset deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};
const DownloadDataset = async (req, res) => {
  try {
    const datasets = await Datasets.find().select("input output -_id").lean();
    const jsonData = JSON.stringify(datasets, null, 2);
    res.setHeader("Content-Disposition", "attachment; filename=datasets.json");
    res.setHeader("Content-Type", "application/json");

    return res.status(200).send(jsonData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  GetDatasets,
  AddDataset,
  UpdateDataset,
  DeleteDataset,
  DownloadDataset,
};
