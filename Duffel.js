require("dotenv").config();
const Duffel = require("@duffel/api");

// Access the token from the environment variables
const duffel = new Duffel({
  token: process.env.DUFFEL_ACCESS_TOKEN,
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

console.log("Token from .env:", process.env.DUFFEL_ACCESS_TOKEN);
