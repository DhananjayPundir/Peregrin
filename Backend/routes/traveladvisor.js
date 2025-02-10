
const express = require('express');
const axios = require('axios');
const router = express.Router();

const TRIPADVISOR_API_KEY = process.env.TRAVELADVISOR_API_KEY;
const TRAVELADVISOR_BASE_URL = 'https://travel-advisor.p.rapidapi.com';
const ORS_API_KEY = process.env.ORS_API_KEY;
const ORS_GEOCODE_BASE_URL = 'https://api.openrouteservice.org/geocode/search';

const getTravelAdvisorHeaders = () => ({
  'X-RapidAPI-Key': TRIPADVISOR_API_KEY,
  'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
});

const getORSHeaders = () => ({
  'Authorization': ORS_API_KEY,
});

router.get('/places', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const orsResponse = await axios.get(ORS_GEOCODE_BASE_URL, {
      params: {
        text: city,
      },
      headers: getORSHeaders(),
    });

    const location = orsResponse.data.features[0];
    if (!location) {
      return res.status(404).json({ error: 'City not found' });
    }

    const lat = location.geometry.coordinates[1];
    const lon = location.geometry.coordinates[0];

    const categories = ['attractions', 'restaurants', 'hotels'];
    const results = {};

    for (const category of categories) {
      const response = await axios.get(`${TRAVELADVISOR_BASE_URL}/${category}/list-by-latlng`, {
        params: {
          latitude: lat,
          longitude: lon,
          radius: 10,
          limit: 10,
          currency: 'USD',
          lang: 'en',
        },
        headers: getTravelAdvisorHeaders(),
      });
      results[category] = response.data;
    }

    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch data' });
  }
});

module.exports = router;
