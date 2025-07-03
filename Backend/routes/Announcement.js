const express = require("express");
const router = express.Router();
const {
  getAnnouncements,
  addAnnouncement,
  getAnnouncement,
  deleteAnnouncement,
  updateAnnoucement,
} = require("../controllers/AnnouncementServices");

router.get("/announcements", getAnnouncements);
router.get("/announcements/:id", getAnnouncement);
router.post("/announcements", addAnnouncement);
router.patch("/announcements/:id", updateAnnoucement);
router.delete("/announcements/:id", deleteAnnouncement);

module.exports = router;
