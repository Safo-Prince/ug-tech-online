const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; // Set your desired port number
app.use(cors());

app.use(bodyParser.json());

app.post('/submit-form', (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);
  res.status(200).send('Form data received successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});