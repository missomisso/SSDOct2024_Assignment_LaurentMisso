const sql = require("mssql");
const dbConfig = require("../dbConfig");

class BicycleSizeRestriction {
  constructor({ AirlineID, MaxWeight, MaxLength, MaxWidth, MaxHeight }) {
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

  static async getByAirlineName(airlineName) {
    const connection = await sql.connect(dbConfig);
    const request = connection.request();
    request.input("airlineName", sql.VarChar, airlineName);
    const result = await request.query(`
      SELECT r.* FROM BicycleSizeRestrictions r
      JOIN Airlines a ON r.AirlineID = a.AirlineID
      WHERE a.AirlineName = @airlineName
    `);
    connection.close();
    return result.recordset.map((row) => new BicycleSizeRestriction(row));
  }

  static async addRestrictions({ AirlineID, MaxWeight, MaxLength, MaxWidth, MaxHeight }) {
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
  }
}

module.exports = BicycleSizeRestriction;