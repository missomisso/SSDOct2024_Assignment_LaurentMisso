const express = require("express");
const bicycleSizeRestrictionController = require("../controllers/bicycleSizeRestrictionController");
const { addRestrictions } = require("../controllers/bicycleSizeRestrictionController");

const router = express.Router();

router.get("/name/:name", bicycleSizeRestrictionController.findRestrictionsByAirlineName); 
router.post("/", addRestrictions); // POST /api/restrictions

module.exports = router;