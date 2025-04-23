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

/** 장바구니 수량에 따른 할인율 적용한 상품 가격 */
export const calculateItemTotal = (cartItem: CartItem) => {
  const { discounts } = cartItem.product;

  if (discounts.length !== 0) {
    return getDiscountedPrice(cartItem);
  }

  return getPrice(cartItem);
};

/** 수량에 따른 최대 할인율 */
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;

  const discountsSorted = product.discounts.sort((a, b) => b.quantity - a.quantity);
  const discount = discountsSorted.find((discount) => discount.quantity <= quantity);

  return discount?.rate || 0;
};

/** 쿠폰에 따른 할인율을 적용한 상품 가격 */
export const getDiscountWithCoupon = (price: Product["price"], selectedCoupon: Coupon | null) => {
  if (!selectedCoupon) {
    return price;
  }
  const { discountType, discountValue } = selectedCoupon;

  return discountType === "amount" ? price - discountValue : price * (1 - discountValue / 100);
};

/** 장바구니 가격  */
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
/** 장바구니에서 상품 제거 */
export const getRemoveCartItem = (cart: CartItem[], productId: string) => {
  return cart.filter((item) => item.product.id !== productId);
};

const getMaxQuantityCartItem = (cartItem: CartItem, newQuantity: number) => {
  const maxQuantity = cartItem.product.stock;
  const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
  return { ...cartItem, quantity: updatedQuantity };
};

const getUpdateQuantityCartItem = (cart: CartItem[], productId: string, newQuantity: number) => {
  return cart.map((item) => {
    if (item.product.id === productId) {
      return getMaxQuantityCartItem(item, newQuantity);
    }
    return item;
  });
};

/** 장바구니 상품 수량 변경 */
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  if (newQuantity <= 0) {
    return getRemoveCartItem(cart, productId);
  }

  return getUpdateQuantityCartItem(cart, productId, newQuantity);
};
