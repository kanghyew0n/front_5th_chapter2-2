import CartItem from "./CartItem";
import { CartItem as ICartItem } from "../../../types";

interface Props {
  cart: ICartItem[];
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
}
const CartItemList = ({ cart, updateQuantity, removeFromCart }: Props) => {
  return (
    <div className="space-y-2">
      {cart.map((item, idx) => {
        return (
          <CartItem
            key={idx}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        );
      })}
    </div>
  );
};

export default CartItemList;
