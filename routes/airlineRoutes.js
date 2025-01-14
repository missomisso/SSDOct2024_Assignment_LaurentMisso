const express = require("express");
const {
  getAllAirlines,
  createAirline,
} = require("../controllers/airlineController");

const router = express.Router();

router.get("/", getAllAirlines);
router.post("/", createAirline);

module.exports = router;
