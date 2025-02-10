
const express = require('express');
const axios = require('axios');
const router = express.Router();

const GEOCODIO_API_KEY = process.env.GEOCODIO_API_KEY;

router.get('/geocode', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const response = await axios.get('https://api.geocod.io/v1.7/geocode', {
      params: {
        api_key: GEOCODIO_API_KEY,
        q: city
      }
    });
    
    if (response.data.results.length === 0) {
      return res.status(404).json({ error: 'Location not found' });
    }
    
    const { lng, lat } = response.data.results[0].location;
    const mapTileUrl = `https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${process.env.MAPTILER_API_KEY}`;
    
    res.json({
      lon: lng,
      lat: lat,
      mapTileUrl
    });
  } catch (error) {
    console.error('Error fetching geocoding data from Geocod.io:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch geocoding data' });
  }
});

module.exports = router;
