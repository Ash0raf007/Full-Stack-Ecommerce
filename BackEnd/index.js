import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './config/dbConn.js';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware to parse JSON requests    
app.use(express.json());

// Connect to MongoDB
dbConnect();
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        methods: 'GET,POST,PUT,DELETE',
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);



//   Create a model from the schema
// products collection in MongoDB
// The model name 'products' is used to create a collection named 'products' in MongoDB
// const ProductsDB = mongoose.model('products', productsSchema);
// const UserDB = mongoose.model('users', userSchema);

    // Define a simple route


    app.use('/api/products', productRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    
    // Error handler
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    });

mongoose.connection.once('open', () => {
    console.log('MongoDB connected successfully');
      // Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});    
})

 mongoose.connection.on('error', (err) => {
console.error('MongoDB connection error:', err);    
})


// Export the app for testing purposes
export default app;
