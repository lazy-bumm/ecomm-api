const mongoose = require('mongoose');
const { variantSchema } = require('./variant');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  variants: [variantSchema], // Include the variants field
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product};
