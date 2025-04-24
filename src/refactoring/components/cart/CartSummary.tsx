import { CartItem, Coupon } from "../../../types";
import CartItemList from "./CartItemList";
import CouponSelector from "./CouponSelector";
import OrderSummary from "./OrderSummary";

interface Props {
  cart: CartItem[];
  coupons: Coupon[];
  selectedCoupon: Coupon | null;
  applyCoupon: (coupon: Coupon) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
  calculateTotal: () => {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
}

const CartSummary = ({
  cart,
  coupons,
  selectedCoupon,
  calculateTotal,
  updateQuantity,
  removeFromCart,
  applyCoupon,
}: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <CartItemList cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
      <CouponSelector coupons={coupons} selectedCoupon={selectedCoupon} applyCoupon={applyCoupon} />
      <OrderSummary calculateTotal={calculateTotal} />
    </div>
  );
};
export default CartSummary;
