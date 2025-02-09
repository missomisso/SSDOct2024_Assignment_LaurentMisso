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
