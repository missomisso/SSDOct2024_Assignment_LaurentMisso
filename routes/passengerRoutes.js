const express = require("express");
const { createPassenger } = require("../controllers/passengerController");

const router = express.Router();

router.post("/", createPassenger); // POST /api/passengers

module.exports = router;
