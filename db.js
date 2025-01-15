const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "Laurent",
  password: process.env.DB_PASSWORD || "160800",
  database: process.env.DB_NAME || "Bicycles",
  trustServerCertificate: true,
  options: {
    port: 1433, // Default SQL Server port
    connectionTimeout: 60000, // Connection timeout in milliseconds
  },
});

module.exports = pool.promise();
