const express = require('express');
const cors = require('cors');
const { logger, log } = require('./logger');
const { nanoid } = require('nanoid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(logger); 

const urlDatabase = {};

app.post('/api/shorten', (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  const shortId = nanoid(6);
  const shortUrl = `http://localhost:${PORT}/${shortId}`;
  urlDatabase[shortId] = originalUrl;

  req.logger?.info?.(`Shortened: ${originalUrl} → ${shortUrl}`);

  res.json({ shortUrl });
});

app.get('/:shortId', (req, res) => {
  const { shortId } = req.params;
  const originalUrl = urlDatabase[shortId];

  if (originalUrl) {
    req.logger?.info?.(`Redirecting to ${originalUrl}`);
    return res.redirect(originalUrl);
  }

  req.logger?.warn?.(`Short ID ${shortId} not found`);
  res.status(404).send('URL not found');
});

app.listen(PORT, () => {
  if (typeof logger.info === 'function') {
    logger.info(`Server running at http://localhost:${PORT}`);
  } else {
    console.log(`Server running at http://localhost:${PORT}`);
  }
});
