const express = require("express");
const {
  AddDataset,
  DownloadDataset,
  GetDatasets,
  UpdateDataset,
  DeleteDataset,
} = require("../controllers/DatasetsServices");
const router = express.Router();

router.post("/", AddDataset);
router.get("/", GetDatasets);
router.patch("/:id", UpdateDataset);
router.delete("/:id", DeleteDataset);
router.get("/download", DownloadDataset);

module.exports = router;
