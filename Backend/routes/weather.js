
const express = require('express');
const axios = require('axios');
const router = express.Router();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;  // WeatherAPI key
const WEATHER_API_BASE_URL = 'http://api.weatherapi.com/v1';
const GEOCODIO_API_KEY = process.env.GEOCODIO_API_KEY;  // Geocod.io API key

// Helper to get coordinates from Geocod.io using a city name
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

// Route to get weather forecast based on city name
router.get('/forecast', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // Step 1: Get coordinates from Geocod.io
    const { lat, lon } = await getCoordinates(city);

    // Step 2: Fetch weather forecast data from WeatherAPI using coordinates
    const weatherResponse = await axios.get(`${WEATHER_API_BASE_URL}/forecast.json`, {
      params: {
        key: WEATHER_API_KEY,
        q: `${lat},${lon}`,   // Use coordinates for the query
        days: 7,              // Number of forecast days
        aqi: 'no',            // Disable air quality index if not needed
        alerts: 'no'          // Disable alerts if not needed
      }
    });

    // Respond with the forecast data
    res.json(weatherResponse.data.forecast.forecastday);
  } catch (error) {
    console.error('Error fetching weather data:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;
