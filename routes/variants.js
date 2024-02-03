const express = require('express');
const router = express.Router();
const { Product } = require('../models/product');



// operations for variants

// Create a new variant for a product
router.post('/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const variantData = req.body;
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      variantData.product = product._id; // Assign the product ID to the variant
  
      const newVariant = await Variant.create(variantData);
      product.variants.push(newVariant);
      await product.save();
  
      res.json(newVariant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Retrieve all variants for a specific product
  router.get('/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId).populate('variants');
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json(product.variants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Update a variant for a product by variant ID
  router.put('/:productId/:variantId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const variantId = req.params.variantId;
      const variantData = req.body;
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const variantToUpdate = product.variants.id(variantId);
  
      if (!variantToUpdate) {
        return res.status(404).json({ error: 'Variant not found' });
      }
  
      variantToUpdate.set(variantData);
      await product.save();
  
      res.json(variantToUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  // Delete a variant for a product by variant ID
  router.delete('/:productId/:variantId', async (req, res) => {
    try {
      const productId = req.params.productId;
      const variantId = req.params.variantId;
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      const variantToDelete = product.variants.id(variantId);
  
      if (!variantToDelete) {
        return res.status(404).json({ error: 'Variant not found' });
      }
  
      // Use the pull method to remove the variant
      product.variants.pull(variantToDelete);
      await product.save();
  
      res.json(variantToDelete);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;