

const express = require('express');
const router = express.Router();

router.get('/map-key', (req, res) => {
  const mapTilerKey = process.env.MAPTILER_API_KEY;
  if (!mapTilerKey) {
    return res.status(500).json({ error: 'MapTiler key not found.' });
  }
  res.json({ key: mapTilerKey });
});

module.exports = router;
