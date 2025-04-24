import CartItem from "./CartItem";
import { CartItem as ICartItem } from "../../../types";

interface Props {
  cart: ICartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
}
const CartItemList = ({ cart, updateQuantity, removeFromCart }: Props) => {
  const getAppliedDiscount = (item: ICartItem) => {
    const { discounts } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discounts) {
      if (quantity >= discount.quantity) {
        appliedDiscount = Math.max(appliedDiscount, discount.rate);
      }
    }
    return appliedDiscount;
  };

  return (
    <div className="space-y-2">
      {cart.map((item, idx) => {
        const appliedDiscount = getAppliedDiscount(item);
        return (
          <CartItem
            key={idx}
            item={item}
            appliedDiscount={appliedDiscount}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        );
      })}
    </div>
  );
};

export default CartItemList;
