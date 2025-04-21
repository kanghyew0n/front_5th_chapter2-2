import { useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState(initialProducts);

  const updateProduct = (editedProduct: Product) => {
    const updatedProducts = products.map((product) => {
      if (editedProduct.id === product.id) {
        return editedProduct;
      }
      return product;
    });

    setProducts(updatedProducts);
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
