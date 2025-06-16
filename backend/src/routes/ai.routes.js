const express = require("express");

const router = express.Router();

const aiController = require("../controllers/ai.controllers");

const verifyToken = require("../middlewares/authMiddleware");

router.post("/get-review", verifyToken, aiController.getResponse);

module.exports = router;
