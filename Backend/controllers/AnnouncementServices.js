const Announcement = require("../model/announcement");

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();

    return res.status(200).json(announcements);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const addAnnouncement = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "The input data is missing!" });
  }
  try {
    const result = await Announcement.create(data);
    return res
      .status(200)
      .json({ message: "New Announcement has been posted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internale server error!" });
  }
};

const getAnnouncement = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({ message: "Id is missing!" });
  }

  try {
    const announcement = await Announcement.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found!" });
    }

    return res.status(200).json(announcement);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const deleteAnnouncement = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(404).json({ message: "Announcement not found!" });
  }
  try {
    const result = await Announcement.findByIdAndDelete(id);

    if (!result) {
      return res.status(400).json({
        message: "Deletion was unsuccessful!",
      });
    }

    return res.status(200).json({ message: "Announcement has been deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateAnnoucement = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!id) {
    return res.status(400).json({ message: "Id is missing in the parameter" });
  }

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ message: "No input data found!" });
  }

  try {
    const announcement = await Announcement.findById(id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found!" });
    }

    // Update fields
    if (data.title !== undefined) announcement.title = data.title;
    if (data.body !== undefined) announcement.body = data.body;

    const updated = await announcement.save();

    return res.status(200).json({
      message: "Announcement updated successfully!",
      data: updated,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = {
  getAnnouncements,
  addAnnouncement,
  getAnnouncement,
  deleteAnnouncement,
  updateAnnoucement,
};
