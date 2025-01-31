require("dotenv").config(); // Load environment variables
const express = require("express"); // Import Express
const app = express(); // Initialize Express app
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
const bodyParser = require("body-parser"); // Body parsing middleware
const { Duffel } = require("@duffel/api"); // Duffel API library
const { errorHandler } = require("./middlewares/errorMiddleware"); // Custom error handler

// Route imports
const flightRoutes = require("./routes/flightRoutes"); // Flight routes
const airlineRoutes = require("./routes/airlineRoutes"); // Airline routes
const passengerRoutes = require("./routes/passengerRoutes"); // Passenger routes
const bicycleSizeRoutes = require("./routes/bicycleSizeRoutes"); // Bicycle size restriction routes

// Duffel API initialization
const duffel = new Duffel({
  token: process.env.DUFFEL_ACCESS_TOKEN,
});

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(express.static("public")); // Serve static files from 'public' directory

// Routes
app.use("/api/airlines", airlineRoutes); // Airline routes
app.use("/api/flights", flightRoutes); // Flight routes
app.use("/api/passengers", passengerRoutes); // Passenger routes
app.use("/api/restrictions", bicycleSizeRoutes); // Bicycle size restriction routes

// Test route
app.get("/api/test", (req, res) => {
  res.status(200).json({ success: true, message: "Test route working!" });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Duffel API is running on http://localhost:${PORT}`);
});

// Optional: Test Duffel API on server start
/*async function fetchDuffelAirlines() {
  try {
    const airlines = await duffel.airlines.list();
    console.log("Duffel Airlines:", airlines.data); // Log the fetched airlines
  } catch (error) {
    console.error("Duffel API error:", error.response?.data || error.message);
  }
}

// Fetch airlines from Duffel to test the API
fetchDuffelAirlines(); */





// require("dotenv").config(); // Load environment variables
// const express = require("express"); // Import Express
// const app = express(); // Initialize Express app
// const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
// const bodyParser = require("body-parser"); // Body parsing middleware
// const { Duffel } = require("@duffel/api"); // Duffel API library
// const { errorHandler } = require("./middlewares/errorMiddleware"); // Custom error handler

// // for duffel api
// const flightRoutes = require("./routes/flightRoutes");

// // for database
// const airlineRoutes = require("./routes/airlineRoutes"); // Airline routes
// const regionRoutes = require("./routes/regionRoutes"); // Region routes
// const airlineController = require("./controllers/airlineController");
// const searchController = require("./controllers/searchController");

// app.get("/getAllAirlines", airlineController.getAllAirlines);

// // Initialize Duffel API with token from environment variables
// const duffel = new Duffel({
//   token: process.env.DUFFEL_ACCESS_TOKEN,
// });

// // Middleware
// app.use(bodyParser.json()); // Parse JSON request bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
// app.use(express.static("public")); // Serve static files from 'public' directory

// // Routes
// app.use("/api/airlines", airlineRoutes); // Airline routes
// app.use("/api/regions", regionRoutes); // Region routes
// app.use("/api/flights", flightRoutes);

// // Error handling middleware
// app.use(errorHandler);

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Duffel API is running on http://localhost:${PORT}`);
// });

// app.get("/api/test", (req, res) => {
//   res.status(200).json({ success: true, message: "Test route working!" });
// });

// console.log("Duffel instance:", duffel);

// // Optional: Test Duffel API on server start
// /*async function fetchDuffelAirlines() {
//   try {
//     const airlines = await duffel.airlines.list();
//     console.log("Duffel Airlines:", airlines.data); // Log the fetched airlines
//   } catch (error) {
//     console.error("Duffel API error:", error.response?.data || error.message);
//   }
// }

// // Fetch airlines from Duffel to test the API
// fetchDuffelAirlines(); */
