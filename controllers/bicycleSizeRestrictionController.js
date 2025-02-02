const bicycleSizeRestriction = require("../models/bicycleSizeRestriction");

const addRestrictions = async (req, res) => {
  try {
    const { AirlineID, MaxWeight, MaxLength, MaxWidth, MaxHeight } = req.body;

    const connection = await sql.connect(dbConfig);
    const request = connection.request();

    request.input("AirlineID", sql.Int, AirlineID);
    request.input("MaxWeight", sql.Float, MaxWeight);
    request.input("MaxLength", sql.Float, MaxLength);
    request.input("MaxWidth", sql.Float, MaxWidth);
    request.input("MaxHeight", sql.Float, MaxHeight);

    await request.query(`
      INSERT INTO BicycleSizeRestrictions (AirlineID, MaxWeight, MaxLength, MaxWidth, MaxHeight)
      VALUES (@AirlineID, @MaxWeight, @MaxLength, @MaxWidth, @MaxHeight);
    `);

    connection.close();
    res.status(201).json({ success: true, message: "Restrictions added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding restrictions." });
  }
};

module.exports = { addRestrictions };





// const Region = require("../models/regionModel");

// const getAllRegions = async (req, res) => {
//   try {
//     const regions = await Region.getAll();
//     res.status(200).json(regions);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const createRegion = async (req, res) => {
//   try {
//     const newRegionId = await Region.create(req.body);
//     res.status(201).json({ message: "Region created", RegionID: newRegionId });
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = {
//   getAllRegions,
//   createRegion,
// };
