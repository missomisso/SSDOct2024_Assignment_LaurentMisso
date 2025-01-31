const sql = require("mssql");
const dbConfig = require("../dbConfig");

class BicycleSizeRestriction {
  constructor({ RestrictionID, AirlineID, MaxWeight, MaxLength, MaxWidth, MaxHeight }) {
    this.RestrictionID = RestrictionID;
    this.AirlineID = AirlineID;
    this.MaxWeight = MaxWeight;
    this.MaxLength = MaxLength;
    this.MaxWidth = MaxWidth;
    this.MaxHeight = MaxHeight;
  }

  static async getByAirlineId(airlineId) {
    const connection = await sql.connect(dbConfig);
    const request = connection.request();
    request.input("airlineId", sql.Int, airlineId);
    const result = await request.query(`
      SELECT * FROM BicycleSizeRestrictions WHERE AirlineID = @airlineId
    `);
    connection.close();
    return result.recordset.map((row) => new BicycleSizeRestriction(row));
  }
}

module.exports = BicycleSizeRestriction;




// const db = require("../db");
// const sql = require("mssql");


// class Model {
//   constructor 
// }

// const Region = {
//   getAll: async () => {
//     const [rows] = await db.query("SELECT * FROM Regions");
//     return rows;
//   },
//   create: async (data) => {
//     const { AirlineID, RegionName, RegionSpecificPolicy } = data;
//     const [result] = await db.query(
//       "INSERT INTO Regions (AirlineID, RegionName, RegionSpecificPolicy) VALUES (?, ?, ?)",
//       [AirlineID, RegionName, RegionSpecificPolicy]
//     );
//     return result.insertId;
//   },
// };

// module.exports = Region;
