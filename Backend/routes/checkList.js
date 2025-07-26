const express = require("express");
const router = express.Router();
const {
  GetCheckList,
  UpdateCheckList,
  AddCheckList,
  DeleteCheckList,
  GetOneCheckList,
} = require("../controllers/CheckListServices");

router.get("/", GetCheckList);
router.get("/:id", GetOneCheckList);
router.patch("/:id", UpdateCheckList);
router.post("/", AddCheckList);
router.delete("/:id", DeleteCheckList);

module.exports = router;
