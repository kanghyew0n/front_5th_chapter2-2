import { Coupon, Product } from "../../types.ts";
import CartSummary from "../components/cart/CartSummary.tsx";
import CartProductList from "../components/cart/ProductList.tsx";
import { useCart } from "../hooks/useCart.ts";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    selectedCoupon,
    calculateTotal,
  } = useCart();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CartProductList products={products} cart={cart} addToCart={addToCart} />
        <CartSummary
          coupons={coupons}
          cart={cart}
          selectedCoupon={selectedCoupon}
          applyCoupon={applyCoupon}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          calculateTotal={calculateTotal}
        />
      </div>
    </div>
  );
};
