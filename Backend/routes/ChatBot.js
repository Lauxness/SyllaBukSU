const express = require("express");
const router = express.Router();
const { ChatBot } = require("../controllers/ChatBotServices");

router.post("/chatbot", ChatBot);

module.exports = router;
