const express = require("express");
const {
  getAllRegions,
  createRegion,
} = require("../flightcontrollers/regionController");

const router = express.Router();

router.get("/", getAllRegions);
router.post("/", createRegion);

module.exports = router;
