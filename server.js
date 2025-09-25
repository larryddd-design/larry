const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

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
