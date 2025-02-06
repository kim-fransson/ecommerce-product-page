/// <reference types="vite/client" />
type ProductImage = {
  original: string;
  thumbnail: string;
};

type Product = {
  id: number;
  price: number;
  discount: number;
  name: string;
  description: string;
  brand: string;
  images: ProductImage[];
};
