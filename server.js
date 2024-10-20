const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const petRoutes = require('./routes/petRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', petRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});