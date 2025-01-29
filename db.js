const sql = require("mssql");

// Database connection configuration
const config = {
  user: process.env.DB_USER || "Laurent", // SQL Server username
  password: process.env.DB_PASSWORD || "160800", // SQL Server password
  server: process.env.DB_HOST || "localhost", // SQL Server host
  database: process.env.DB_NAME || "Bicycle", // Database name
  options: {
    encrypt: true, // Use encryption (required for Azure)
    trustServerCertificate: true, // Allow self-signed certificates
  },
  pool: {
    max: 10, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    idleTimeoutMillis: 30000, // Idle timeout for connections
  },
};

// module.exports = {
//   user: "Laurent", // Replace with your SQL Server login username
//   password: "160800", // Replace with your SQL Server login password
//   server: "localhost",
//   database: "Bicycle",
//   trustServerCertificate: true,
//   options: {
//     port: 1433, // Default SQL Server port
//     connectionTimeout: 60000, // Connection timeout in milliseconds
//   },
// };

module.exports = config;
