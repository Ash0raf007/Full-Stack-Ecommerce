// routes/productRoutes.js
import express from 'express';
import Product from '../models/Products.js';
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";
// upload image 
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const all = await Product.find();
    res.json(all);
});

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching product', error: err.message });
    }
});


// ✅ Admin only: Add product (with image URL)
router.post('/add', upload.single('image'), async (req, res) => {
    try {
      // Extracting product details from req.body
      const {
        name,
        description,
        price,
        category,
        rating,
        reviews,
        stock,
        brand,
        discount,
        inStock,
      } = req.body;
  
      // Handling image upload, setting image path if an image was uploaded
      const imagePath = req.file ? `/uploads/${req.file.filename}` : '';
  
      // Create new product with the extracted data
      const newProduct = new Product({
        name,
        description,
        price,
        image: imagePath, // Store image path
        category,
        rating,
        reviews,
        stock,
        brand,
        discount,
        inStock,
      });
  
      // Save the new product to the database
      await newProduct.save();
  
      // Respond with success message
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (err) {
      // Catch and respond with error message if something goes wrong
      res.status(500).json({ message: 'Error adding product', error: err.message });
    }
  });
  

// ✅ Admin only: Update product
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
});

// ✅ Admin only: Delete product
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
});




export default router;
