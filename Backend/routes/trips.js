
const express = require('express');
const axios = require('axios');
const router = express.Router();

const ORS_API_KEY = process.env.ORS_API_KEY;
const ORS_BASE_URL = 'https://api.openrouteservice.org';

router.post('/', async (req, res) => {
  const { stops } = req.body;

  if (!stops || stops.length < 2) {
    return res.status(400).json({ error: 'At least two stops are required for route calculation' });
  }

  try {
    const coordinates = stops.map(stop => [stop.lon, stop.lat]);
    const response = await axios.post(`${ORS_BASE_URL}/v2/directions/driving-car`, {
      coordinates
    }, {
      params: { api_key: ORS_API_KEY }
    });

    res.json({ route: response.data.routes[0] });
  } catch (error) {
    console.error('Error creating trip with ORS:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to create trip with route directions' });
  }
});

module.exports = router;
