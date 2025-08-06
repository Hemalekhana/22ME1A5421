import React, { useState } from 'react';
import './UrlShortenerForm.css';

function UrlShortenerForm() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleShorten = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    try {
      const res = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url }),
      });

      if (!res.ok) {
        throw new Error('Failed to shorten URL');
      }

      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="shortener-container">
      <h2>URL Shortener</h2>
      <form onSubmit={handleShorten}>
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <p>
          Shortened URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UrlShortenerForm;
