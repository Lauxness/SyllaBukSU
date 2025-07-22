const express = require("express");
const router = express.Router();
const {
  GetDashboard,
  DonwloadReport,
} = require("../controllers/AdminServices");

router.get("/dashboard", GetDashboard);
router.post("/download_report", DonwloadReport);

module.exports = router;
