'use client';
import useCartContext from '@/hooks/use-cart-context';
import CartCard from '@/components/widgets/card/cart-card';

const CartSection = () => {
  const { cart, removeFromCart, updateQuantity } = useCartContext();

  if (!cart.items.length) {
    return (
      <div className="border-border-foreground flex h-40 items-center justify-center rounded-[1.25rem] border px-4 lg:px-6">
        <p className="text-primary">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="border-border-foreground h-fit divide-y-2 rounded-[1.25rem] border px-4 lg:px-6">
      {cart.items.map((item) => (
        <CartCard
          key={item.id}
          {...item}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      ))}
    </div>
  );
};

export default CartSection;
