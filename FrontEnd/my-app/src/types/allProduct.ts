export type Product ={
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
    stock: number;
    brand: string;
    discount: number;
    inStock: boolean;
    __v: number;
  }

  export type ProductForm = {
    name: string;
    description: string;
    price: number;
    image: string;
    category?: string;
    rating?: number;
    reviews?: number;
    stock?: number;
    brand?: string;
    discount?: number;
    inStock?: boolean | undefined;
  }