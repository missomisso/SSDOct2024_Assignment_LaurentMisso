const Airline = require("../models/airlineModel");

const getAllAirlines = async (req, res) => {
  try {
    const airlines = await Airline.getAll();
    res.status(200).json(airlines);
  } catch (error) {
    console.log(error);
  }
};

const createAirline = async (req, res) => {
  try {
    const newAirlineId = await Airline.create(req.body);
    res
      .status(201)
      .json({ message: "Airline created", AirlineID: newAirlineId });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllAirlines,
  createAirline,
};
