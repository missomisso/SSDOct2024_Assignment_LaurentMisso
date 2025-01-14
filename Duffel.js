require("dotenv").config();
const express = require("express"); // Import Express
const app = express();
const PORT = process.env.PORT || 3000;
const { Duffel } = require("@duffel/api");
const bodyParser = require("body-parser");
const airlineRoutes = require("./routes/airlineRoutes");
const regionRoutes = require("./routes/regionRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/airlines", airlineRoutes);
app.use("/api/regions", regionRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Duffel API is running on http://localhost:${PORT}`);
});

// Access the token from the environment variables
const duffel = new Duffel({
  token: process.env.DUFFEL_ACCESS_TOKEN, // Use the environment variable
});

async function fetchAirlines() {
  try {
    const airlines = await duffel.airlines.list();
    console.log("Airlines:", airlines);
  } catch (error) {
    console.error("Error fetching airlines:", error);
  }
}

fetchAirlines();

console.log("Token:", process.env.DUFFEL_ACCESS_TOKEN);
