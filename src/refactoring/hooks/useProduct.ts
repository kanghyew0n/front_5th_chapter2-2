import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  const updateProduct = (editedProduct: Product) => {
    setProducts((prev) => {
      return prev.map((product) => {
        if (editedProduct.id === product.id) {
          return editedProduct;
        }
        return product;
      });
    });
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return {
    products: products,
    updateProduct,
    addProduct,
  };
};
