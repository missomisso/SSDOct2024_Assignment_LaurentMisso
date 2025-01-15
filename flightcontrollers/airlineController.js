const Airline = require("../flightmodels/airlineModel");

const getAllAirlines = async (req, res, next) => {
  try {
    const airlines = await Airline.getAll();
    res.status(200).json(airlines);
  } catch (error) {
    next(error);
  }
};

const createAirline = async (req, res, next) => {
  try {
    const newAirlineId = await Airline.create(req.body);
    res
      .status(201)
      .json({ message: "Airline created", AirlineID: newAirlineId });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAirlines,
  createAirline,
};
