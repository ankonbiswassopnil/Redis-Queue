const express = require('express');
const bodyParser = require('body-parser');
const addJobToQueue = require('./queue');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// API: POST /add-job
app.post('/add-job', (req, res) => {
  const jobData = req.body;

  if (!jobData || Object.keys(jobData).length === 0) {
    return res.status(400).json({ status: 'error', message: 'Empty job data' });
  }

  addJobToQueue(jobData);
  return res.json({ status: 'success', message: 'Job added to queue' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
