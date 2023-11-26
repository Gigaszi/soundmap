const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const app = express();
const port = 3000;

// Database configuration
const db = pgp({
  host: '127.0.0.1',
  database: 'test',
  user: 'levi',
  password: 'test',
  port: 5433,
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define a route to get image metadata by ID
app.get('/api/images/:id', async (req, res) => {
  const imageId = req.params.id;

  try {
    const images = await db.manyOrNone('SELECT * FROM soundmap_images WHERE feature_id = $1', imageId);

    if (images && images.length > 0) {
      res.json(images);
    } else {
      res.status(404).json({ error: 'Images not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
