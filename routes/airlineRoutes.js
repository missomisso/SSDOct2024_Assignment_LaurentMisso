const express = require("express");
const airlineController = require("../controllers/airlineController");
const { createAirline } = require("../controllers/airlineController");

const router = express.Router();

router.get("/", airlineController.getAllAirlines);
router.get("/:id", airlineController.getAirlineDetails);
router.post("/", createAirline); // POST /api/airlines
router.get("/bicycle-policy/name/:name", airlineController.getBicyclePolicyByAirlineName);
router.get("/bicycle-policy/id/:id", airlineController.getBicyclePolicyByAirlineId);


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
