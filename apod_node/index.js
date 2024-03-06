const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/apod', async (req, res) => {
  try {
    const date = req.query.date || '';
    const startDate = req.query.start_date || '';
    const endDate = req.query.end_date || '';
    const count = req.query.count || '';
    const thumbs = req.query.thumbs || false;
    const apiKey = req.query.api_key || 'Owwu0ar0RtvX84p0bjHW1r7nlzKvozGfdCpqx8yR';

    const apiUrl = 'https://api.nasa.gov/planetary/apod';
    const queryParams = { api_key: apiKey, date, start_date: startDate, end_date: endDate, count, thumbs };

    const response = await axios.get(apiUrl, { params: queryParams });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 