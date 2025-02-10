const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
dotenv.config();
const placesRouter = require('./routes/places');
const tripsRouter = require('./routes/trips');
const weatherRouter = require('./routes/weather');
const geocodeRouter = require('./routes/geocode');
const travelAdvisorRouter = require('./routes/traveladvisor');
const mapKeyRoute = require('./routes/mapKey');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/places', placesRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/ors', geocodeRouter);
app.use('/api/traveladvisor', travelAdvisorRouter);
app.use('/api', mapKeyRoute);

// Root route for testing server status
app.use('/', (req, res) => {
  res.send('API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});