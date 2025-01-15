const db = require("./db");

const Region = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM Regions");
    return rows;
  },
  create: async (data) => {
    const { AirlineID, RegionName, RegionSpecificPolicy } = data;
    const [result] = await db.query(
      "INSERT INTO Regions (AirlineID, RegionName, RegionSpecificPolicy) VALUES (?, ?, ?)",
      [AirlineID, RegionName, RegionSpecificPolicy]
    );
    return result.insertId;
  },
};

module.exports = Region;
