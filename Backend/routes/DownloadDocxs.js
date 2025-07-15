const express = require("express");
const router = express.Router();
const { DownloadDocxs } = require("../controllers/DownloadDocxsServices");

router.get("/download", DownloadDocxs);

module.exports = router;
