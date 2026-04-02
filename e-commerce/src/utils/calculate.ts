import { CartItem } from '@/types/cart';

/**
 * Calculate the total price of items in the cart.
 * It computes the subtotal by summing the price of each item multiplied by its quantity,
 * applies any item-specific discounts, and then applies a global discount and adds a fee.
 * @param items - Array of cart items
 * @param discount - Discount percentage to apply
 * @param fee - Additional fee to add
 * @returns - An object containing the subtotal and total price
 */
export const calculateTotalPrice = (
  items: CartItem[],
  discount: number = 0,
  fee: number = 0
) => {
  const subTotal = items.reduce((total, item) => {
    const itemTotal = item.price * item.quantity;
    return (
      total +
      (item.discountPercentage
        ? itemTotal - (itemTotal * item.discountPercentage) / 100
        : itemTotal)
    );
  }, 0);

  const total = subTotal - (subTotal * discount) / 100 + fee;

  return { subTotal, total };
};
