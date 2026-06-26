// admin-server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.json());
// Serve the frontend files locally for testing
app.use(express.static(__dirname));

const DB_PATH = path.join(__dirname, 'db.json');

// API Endpoint to overwrite your database file locally
app.post('/api/save', (req, res) => {
  const updatedData = req.body;
  
  fs.writeFile(DB_PATH, JSON.stringify(updatedData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to write to db.json' });
    }
    res.json({ message: 'Database updated locally! Commit and push to publish.' });
  });
});

app.listen(PORT, () => {
  console.log(`\n⚙️  Admin Hub running locally at: http://localhost:${PORT}`);
  console.log(`📝 Edit links in your code or via API, then push 'db.json' to update your GitHub live site.`);
});