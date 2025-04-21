import { CartItem, Coupon } from "../../types";

const getPrice = (item: CartItem) => {
  return item.product.price * item.quantity;
};

const getDiscountedPrice = (item: CartItem) => {
  const { product, quantity } = item;

  const discountRate = getMaxApplicableDiscount(item);

  if (!discountRate) {
    return getPrice(item);
  }

  return product.price * quantity * (1 - discountRate);
};

export const calculateItemTotal = (cartItem: CartItem) => {
  const { discounts } = cartItem.product;

  if (discounts.length !== 0) {
    return getDiscountedPrice(cartItem);
  }

  return getPrice(cartItem);
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;

  const discountsSorted = product.discounts.sort((a, b) => b.quantity - a.quantity);
  const discount = discountsSorted.find((discount) => discount.quantity <= quantity);

  return discount?.rate || 0;
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  return {
    totalBeforeDiscount: 0,
    totalAfterDiscount: 0,
    totalDiscount: 0,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return [];
};
