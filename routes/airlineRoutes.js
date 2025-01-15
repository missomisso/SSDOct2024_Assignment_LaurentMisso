const express = require("express");
const { getAllAirlines } = require("../flightcontrollers/airlineController");

const router = express.Router();

router.get("/", getAllAirlines);
router.post("/", createAirline);

module.exports = router;

console.log(require.resolve("../flightcontrollers/airlineController"));
