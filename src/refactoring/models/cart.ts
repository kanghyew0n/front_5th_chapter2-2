import { CartItem, Coupon, Product } from "../../types";

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

export const getDiscountWithCoupon = (price: Product["price"], selectedCoupon: Coupon | null) => {
  if (!selectedCoupon) {
    return price;
  }
  const { discountType, discountValue } = selectedCoupon;

  return discountType === "amount" ? price - discountValue : price * (1 - discountValue / 100);
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totalBeforeDiscount = cart.reduce((total, item) => total + getPrice(item), 0);
  const totalProductDiscount = cart.reduce((total, item) => total + getDiscountedPrice(item), 0);
  const totalAfterDiscount = getDiscountWithCoupon(totalProductDiscount, selectedCoupon);

  return {
    totalBeforeDiscount: totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount: totalBeforeDiscount - totalAfterDiscount,
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return [];
};
