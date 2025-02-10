
const express = require('express');
const axios = require('axios');
const router = express.Router();

const TRIPADVISOR_API_KEY = process.env.TRAVELADVISOR_API_KEY;
const TRAVELADVISOR_BASE_URL = 'https://travel-advisor.p.rapidapi.com';
const GEOCODIO_API_KEY = process.env.GEOCODIO_API_KEY;

// Helper to get TravelAdvisor API headers
const getTravelAdvisorHeaders = () => ({
  'X-RapidAPI-Key': TRIPADVISOR_API_KEY,
  'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
});

// Helper to get latitude and longitude from Geocod.io based on city name
async function getCoordinates(city) {
  try {
    const response = await axios.get('https://api.geocod.io/v1.7/geocode', {
      params: {
        q: city,
        api_key: GEOCODIO_API_KEY
      }
    });
    if (response.data.results && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].location;
      return { lat, lon: lng };
    }
    throw new Error('City not found');
  } catch (error) {
    throw new Error('Failed to fetch coordinates from Geocod.io');
  }
}

// Main route to get travel information
router.get('/', async (req, res) => {
  const { city, query } = req.query;
  if (!city || !query) {
    return res.status(400).json({ error: 'City and query are required' });
  }

  try {
    // Step 1: Get coordinates from Geocod.io
    const { lat, lon } = await getCoordinates(city);

    // Step 2: Fetch data from TravelAdvisor API
    const categories = ['attractions', 'restaurants', 'hotels'];
    const results = {};

    for (const category of categories) {
      const response = await axios.get(`${TRAVELADVISOR_BASE_URL}/${category}/list-by-latlng`, {
        params: {
          latitude: lat,
          longitude: lon,
          radius: 25,
          limit: 10,
          currency: 'USD',
          lang: 'en'
        },
        headers: getTravelAdvisorHeaders()
      });
      results[category] = response.data;
    }

    res.json(results);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch travel information' });
  }
});

module.exports = router;
