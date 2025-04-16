import mongoose from "mongoose";

export const productsSchema = new mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        image: String,
        category: String,
        rating: Number,
        reviews: Number,
        stock: Number,
        brand: String,
        discount: Number,
        inStock: Boolean, 
      });


const Product = mongoose.model('product', productsSchema);
export default Product;
