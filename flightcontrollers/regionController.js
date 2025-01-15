const Region = require("../models/regionModel");

const getAllRegions = async (req, res, next) => {
  try {
    const regions = await Region.getAll();
    res.status(200).json(regions);
  } catch (error) {
    next(error);
  }
};

const createRegion = async (req, res, next) => {
  try {
    const newRegionId = await Region.create(req.body);
    res.status(201).json({ message: "Region created", RegionID: newRegionId });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRegions,
  createRegion,
};
