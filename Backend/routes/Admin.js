const express = require("express");
const router = express.Router();
const { GetDashboard } = require("../controllers/AdminServices");

router.get("/dashboard", GetDashboard);

module.exports = router;
