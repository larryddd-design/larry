const express = require('express');
const path = require('path');
const requestIp = require('request-ip');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestIp.mw());

app.use(async (req, res, next) => {
  const ip = req.clientIp || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'];

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const locationData = await response.json();

    console.log('📍 New Visitor:');
    console.log('IP:', ip);
    console.log('Location:', locationData.city, locationData.country_name);
    console.log('Browser:', userAgent);
    console.log('-----------------------');
  } catch (error) {
    console.error('Error fetching IP data:', error);
  }

  next();
});

// Serve static files (css, js, images)
app.use(express.static(path.join(__dirname)));

// Route for your HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'new.html'));
});

// Catch-all (fixed)
app.get(/.*/, (req, res) => {
  res.status(404).send('404 - Page Not Found');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
