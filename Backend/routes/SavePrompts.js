const express = require("express");
const router = express.Router();
const {
  SavePrompt,
  GetPrompts,
  GetPrompt,
  DeletePrompt,
} = require("../controllers/SavePromptsServices");
router.post("/save", SavePrompt);
router.get("/save", GetPrompts);
router.get("/save/:id", GetPrompt);
router.delete("/delete/:id", DeletePrompt);

module.exports = router;
