const BicycleSizeRestriction = require("../models/bicycleSizeRestriction");

const addRestrictions = async (req, res) => {
  try {
    const { AirlineID, MaxWeight, MaxLength, MaxWidth, MaxHeight } = req.body;

    await BicycleSizeRestriction.addRestrictions({
      AirlineID,
      MaxWeight,
      MaxLength,
      MaxWidth,
      MaxHeight,
    });

    res.status(201).json({ success: true, message: "Restrictions added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding restrictions." });
  }
};

const findRestrictionsByAirlineName = async (req, res) => {
  try {
    const airlineName = req.params.name;
    const restrictions = await BicycleSizeRestriction.getByAirlineName(airlineName);

    if (restrictions.length > 0) {
      res.status(200).json({ success: true, data: restrictions });
    } else {
      res.status(404).json({ success: false, message: "No restrictions found for this airline." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving restrictions." });
  }
};

module.exports = {
  addRestrictions,
  findRestrictionsByAirlineName,
};