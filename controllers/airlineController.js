const airline = require("../models/airline");
const bicycleSizeRestriction = require("../models/bicycleSizeRestriction");

const getAllAirlines = async (req, res) => {
  try {
    const airlines = await airline.getAllAirlines();
    res.status(200).json({ success: true, data: airlines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving airlines." });
  }
};

const getAirlineDetails = async (req, res) => {
  try {
    const airlineId = parseInt(req.params.id, 10);
    const airline = await airline.getAirlineById(airlineId);
    if (!airline) {
      return res.status(404).json({ success: false, message: "Airline not found." });
    }

    const restrictions = await bicycleSizeRestriction.getByAirlineId(airlineId);
    res.status(200).json({ success: true, data: { airline, restrictions } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving airline details." });
  }
};

const getBicyclePolicyByAirlineName = async (req, res) => {
  try {
    const airlineName = req.params.name;
    const bicyclePolicy = await airline.getBicyclePolicyByAirlineName(airlineName);
    res.status(200).json({ success: true, data: { airlineName, bicyclePolicy } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving bicycle policy." });
  }
};

const getBicyclePolicyByAirlineId = async (req, res) => {
  try {
    const airlineId = parseInt(req.params.id, 10);
    const bicyclePolicy = await airline.getBicyclePolicyByAirlineId(airlineId);
    res.status(200).json({ success: true, data: { airlineId, bicyclePolicy } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving bicycle policy." });
  }
};

const createAirline = async (req, res) => {
  try {
    const { AirlineName, IATA_Code, ICAO_Code, BicyclePolicy } = req.body;

    const newAirline = await airline.createAirline({
      AirlineName,
      IATA_Code,
      ICAO_Code,
      BicyclePolicy,
    });

    res.status(201).json({ success: true, data: newAirline });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating airline." });
  }
};

const deleteAirline = async (req, res) => {
  try {
      const { id } = req.params; // Get airline ID from request URL

      // ✅ Check if airline exists
      const airlineExists = await airline.getAirlineById(id);
      if (!airlineExists) {
          return res.status(404).json({ success: false, message: "Airline not found." });
      }

      // ✅ Delete airline from DB
      await airline.deleteAirline(id);
      res.json({ success: true, message: "Airline deleted successfully!" });

  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error deleting airline." });
  }
};



module.exports = { getAllAirlines, getAirlineDetails, createAirline,  getBicyclePolicyByAirlineName,
  getBicyclePolicyByAirlineId, deleteAirline
};


