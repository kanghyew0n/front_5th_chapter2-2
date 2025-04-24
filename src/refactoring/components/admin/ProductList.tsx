import { useState } from "react";
import { Product } from "../../../types";
import ProductForm from "./ProductForm";
import AdminProductItem from "./ProductItem";

interface Props {
  products: Product[];
  onProductAdd: (newProduct: Product) => void;
  onProductUpdate: (updatedProduct: Product) => void;
}

const AdminProductList = ({ products, onProductUpdate, onProductAdd }: Props) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <ProductForm onProductAdd={onProductAdd} setShowNewProductForm={setShowNewProductForm} />
      )}
      <AdminProductItem products={products} onProductUpdate={onProductUpdate} />
    </div>
  );
};

export default AdminProductList;
