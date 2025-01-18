const sql = require("mssql");

// Database connection configuration
const config = {
  user: process.env.DB_USER || "Laurent", // SQL Server username
  password: process.env.DB_PASSWORD || "160800", // SQL Server password
  server: process.env.DB_HOST || "localhost", // SQL Server host
  database: process.env.DB_NAME || "Bicycles", // Database name
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

// Create a connection pool
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    throw err;
  });

module.exports = poolPromise;
