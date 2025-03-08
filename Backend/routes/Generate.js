const express = require("express");
const router = express.Router();
const {
  GenerateDescription,
  GenerateCourseOutcomes,
  GenerateLearningOutcomes,
  GenerateAll,
} = require("../controllers/GenerateServices");

router.post("/generate_description", GenerateDescription);
router.post("/generate_cos", GenerateCourseOutcomes);
router.post("/generate_slos", GenerateLearningOutcomes);
router.post("/generate_allinone", GenerateAll);

module.exports = router;
