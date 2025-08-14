const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const currencyRoutes = require('./routes/currencyRoutes');
app.use('/api/currencies', currencyRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/currencyDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
