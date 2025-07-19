const express = require("express");
const router = express.Router();
const { GetUser } = require("../controllers/UserServices");

router.get("/user/:id", GetUser);
module.exports = router;
