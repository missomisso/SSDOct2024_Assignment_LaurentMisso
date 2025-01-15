const express = require("express");
const { getAllAirlines } = require("../flight_controllers/airlineController");

const router = express.Router();

router.get("/", getAllAirlines);
router.post("/", createAirline);

module.exports = router;

console.log(require.resolve("../flight_controllers/airlineController"));
