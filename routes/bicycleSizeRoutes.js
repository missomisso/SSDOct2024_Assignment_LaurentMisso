const express = require("express");
const { addRestrictions } = require("../controllers/bicycleSizeRestrictionController");

const router = express.Router();

router.post("/", addRestrictions); // POST /api/restrictions

module.exports = router;





// const express = require("express");
// const {
//   getAllRegions,
//   createRegion,
// } = require("../controllers/regionController");

// const router = express.Router();

// router.get("/", getAllRegions);
// router.post("/", createRegion);

// module.exports = router;
