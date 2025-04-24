// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, getRemoveCartItem, updateCartItemQuantity } from "../models/cart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const isInCart = prev.some((item) => item.product.id === product.id);
      if (isInCart) {
        const newQuantity = cart.find((item) => item.product.id === product.id)!.quantity + 1;
        return updateCartItemQuantity(prev, product.id, newQuantity);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

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
