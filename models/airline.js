const sql = require("mssql");
const dbConfig = require("../dbConfig");
const { Airlines } = require("@duffel/api/supportingResources");

class airlines {
  constructor({ AirlineID, AirlineName, IATA_Code, ICAO_Code, BicyclePolicy }) {
    this.AirlineID = AirlineID;
    this.AirlineName = AirlineName;
    this.IATA_Code = IATA_Code;
    this.ICAO_Code = ICAO_Code;
    this.BicyclePolicy = BicyclePolicy;
  }

  static async getAllAirlines() {
    const connection = await sql.connect(dbConfig);
    const result = await connection.query("SELECT * FROM Airlines");
    connection.close();
    return result.recordset.map((row) => new Airline(row));
  }

  static async getAirlineById(id) {
    const connection = await sql.connect(dbConfig);
    const request = connection.request();
    request.input("id", sql.Int, id);
    const result = await request.query("SELECT * FROM Airlines WHERE AirlineID = @id");
    connection.close();
    return new Airline(result.recordset[0]);
  }

  static async createAirline(data) {
    const connection = await sql.connect(dbConfig);
    const request = connection.request();
    request.input("AirlineName", sql.NVarChar, data.AirlineName);
    request.input("IATA_Code", sql.NVarChar, data.IATA_Code);
    request.input("ICAO_Code", sql.NVarChar, data.ICAO_Code);
    request.input("BicyclePolicy", sql.NVarChar, data.BicyclePolicy);
    const result = await request.query(`
      INSERT INTO Airlines (AirlineName, IATA_Code, ICAO_Code, BicyclePolicy)
      VALUES (@AirlineName, @IATA_Code, @ICAO_Code, @BicyclePolicy);
      SELECT SCOPE_IDENTITY() AS AirlineID;
    `);
    connection.close();
    return this.getAirlineById(result.recordset[0].AirlineID);
  }
}

module.exports = Airlines;





/*const Airline = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM Airlines");
    return rows;
  },
  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM Airlines WHERE AirlineID = ?",
      [id]
    );
    return rows[0];
  },
  create: async (data) => {
    const { AirlineName, IATA_Code, ICAO_Code } = data;
    const [result] = await db.query(
      "INSERT INTO Airlines (AirlineName, IATA_Code, ICAO_Code) VALUES (?, ?, ?)",
      [AirlineName, IATA_Code, ICAO_Code]
    );
    return result.insertId;
  },
}; */

module.exports = Airline;
