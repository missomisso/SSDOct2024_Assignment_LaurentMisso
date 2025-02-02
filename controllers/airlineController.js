const Airlines = require("../models/airline");
const BicycleSizeRestriction = require("../models/bicycleSizeRestriction");

const getAllAirlines = async (req, res) => {
  try {
    const airlines = await Airlines.getAllAirlines();
    res.status(200).json({ success: true, data: airlines });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving airlines." });
  }
};

const getAirlineDetails = async (req, res) => {
  try {
    const airlineId = parseInt(req.params.id, 10);
    const airline = await Airline.getAirlineById(airlineId);
    if (!airline) {
      return res.status(404).json({ success: false, message: "Airline not found." });
    }

    const restrictions = await BicycleSizeRestriction.getByAirlineId(airlineId);
    res.status(200).json({ success: true, data: { airline, restrictions } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving airline details." });
  }
};

const getBicyclePolicyByAirlineName = async (req, res) => {
  try {
    const airlineName = req.params.name;
    const bicyclePolicy = await Airline.getBicyclePolicyByAirlineName(airlineName);
    res.status(200).json({ success: true, data: { airlineName, bicyclePolicy } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving bicycle policy." });
  }
};

const getBicyclePolicyByAirlineId = async (req, res) => {
  try {
    const airlineId = parseInt(req.params.id, 10);
    const bicyclePolicy = await Airline.getBicyclePolicyByAirlineId(airlineId);
    res.status(200).json({ success: true, data: { airlineId, bicyclePolicy } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error retrieving bicycle policy." });
  }
};

const createAirline = async (req, res) => {
  try {
    const { AirlineName, IATA_Code, ICAO_Code, BicyclePolicy } = req.body;

    const newAirline = await Airline.createAirline({
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



module.exports = { getAllAirlines, getAirlineDetails, createAirline,  getBicyclePolicyByAirlineName,
  getBicyclePolicyByAirlineId,
};





// const Airline = require("../models/airlineModel");

// const getAllAirlines = async (req, res) => {
//   try {
//     const airlines = await Airline.getAll();
//     res.status(200).json(airlines);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const createAirline = async (req, res) => {
//   try {
//     const newAirlineId = await Airline.create(req.body);
//     res
//       .status(201)
//       .json({ message: "Airline created", AirlineID: newAirlineId });
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = {
//   getAllAirlines,
//   createAirline,
// };
