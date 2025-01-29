const db = require("../db");
const sql = require("mssql");

class Airline {
  constructor(AirlineID, AirlineName, IATA_Code, ICAO_Code) {
    this.AirlineID = AirlineID;
    this.AirlineName = AirlineName;
    this.IATA_Code = IATA_Code;
    this.ICAO_Code = ICAO_Code;
  }

  static async getAll() {
    const connection = await sql.connect(db);

    const sqlQuery = `SELECT * FROM Airlines`; // Replace with your actual table name

    const request = connection.request();
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset.map(
      (row) => new Airline(row.AirlineName, row.IATA_Code, row.ICAO_Code)
    ); // Convert rows to Airline objects
  }

  static async getById(id) {
    const connection = await sql.connect(db);

    const sqlQuery = `SELECT * FROM Airlines WHERE AirlineID = @id`; // Replace with your actual table name

    const request = connection.request();
    request.input("id", sql.Int, id);
    const result = await request.query(sqlQuery);

    connection.close();

    const row = result.recordset[0];
    return new Airline(row.AirlineName, row.IATA_Code, row.ICAO_Code); // Convert row to Airline object
  }

}

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
