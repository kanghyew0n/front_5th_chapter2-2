// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, getRemoveCartItem, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {};

  const removeFromCart = (productId: string) => {
    const removedCartItem = getRemoveCartItem(cart, productId);
    setCart(removedCartItem);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prev) => {
      const updatedCart = updateCartItemQuantity(prev, productId, newQuantity);
      return updatedCart;
    });
  };

  const applyCoupon = (coupon: Coupon) => {
    return setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateCartTotal(
      cart,
      selectedCoupon
    );
    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount,
    };
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
