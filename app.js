require('dotenv').config();


const express = require('express');
const mongoose = require('./db');
const app = express();

const productsRoutes = require('./routes/products');
const searchRoutes = require('./routes/search');
const variantsRoutes = require('./routes/variants');

app.use('/api/products', productsRoutes);
app.use('/api/search', searchRoutes); 
app.use('/api/variants', variantsRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;