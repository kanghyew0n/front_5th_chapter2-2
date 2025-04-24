import { Product } from "../../../types";
import ProductItem from "./ProductItem";

interface Props {
  products: Product[];
  cart: { product: Product; quantity: number }[];
  addToCart: (product: Product) => void;
}

const CartProductList = ({ products, cart, addToCart }: Props) => {
  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {products.map((product) => {
          const remainingStock = getRemainingStock(product);
          return (
            <ProductItem remainingStock={remainingStock} product={product} addToCart={addToCart} />
          );
        })}
      </div>
    </div>
  );
};

export default CartProductList;
