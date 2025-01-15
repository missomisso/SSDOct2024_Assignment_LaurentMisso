const express = require("express");
const {
  getAllRegions,
  createRegion,
} = require("../controllers/regionController");

const router = express.Router();

router.get("/", getAllRegions);
router.post("/", createRegion);

module.exports = router;
