const express = require("express");
const { getAllAirlines, getAirlineDetails, createAirline } = require("../controllers/airlineController");

const router = express.Router();

router.get("/", getAllAirlines); // GET /api/airlines
router.get("/:id", getAirlineDetails); // GET /api/airlines/:id
router.post("/", createAirline); // POST /api/airlines

module.exports = router;





// const express = require("express");
// const {
//   getAllAirlines,
//   createAirline,
// } = require("../controllers/airlineController");

// const router = express.Router();

// router.get("/", getAllAirlines);
// router.post("/", createAirline);

// module.exports = router;

// console.log(require.resolve("../controllers/airlineController"));
