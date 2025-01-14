const db = require("./db");

const Airline = {
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
};

module.exports = Airline;
