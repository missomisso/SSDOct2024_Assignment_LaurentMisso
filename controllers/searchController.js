const duffel = require("../Duffel");

const searchFlights = async (req, res) => {
  try {
    const { origin, destination, departure_date } = req.body;

    const offerRequest = await duffel.offerRequests.create({
      slices: [
        {
          origin, // e.g., "LHR" (London Heathrow)
          destination, // e.g., "JFK" (New York JFK)
          departure_date, // e.g., "2025-05-01"
        },
      ],
      passengers: [
        {
          type: "adult",
        },
      ],
      cabin_class: "economy", // Optional: economy, business, first
    });

    res.status(200).json({ success: true, data: offerRequest });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.response?.data || error.message });
  }
};

const getFlightOffers = async (req, res) => {
  try {
    const { offer_request_id } = req.query; // Pass the Offer Request ID as a query parameter

    const offers = await duffel.offers.list({ offer_request_id });
    res.status(200).json({ success: true, data: offers.data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.response?.data || error.message });
  }
};

const bookFlight = async (req, res) => {
  try {
    const { selected_offer_id, passengers } = req.body;

    const order = await duffel.orders.create({
      selected_offer: selected_offer_id,
      passengers,
    });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: error.response?.data || error.message });
  }
};

module.exports = { bookFlight };
module.exports = { getFlightOffers };
module.exports = { searchFlights };
