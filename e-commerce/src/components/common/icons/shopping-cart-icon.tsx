'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

import { ROUTES } from '@/constants/routes';

import useCartContext from '@/hooks/use-cart-context';

const ShoppingCartIcon = () => {
  const { cart } = useCartContext();

  const itemCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Link href={ROUTES.CART} passHref>
      <div className="relative">
        <ShoppingCart />
        {itemCount > 0 && (
          <div className="bg-destructive text-contained absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-xs">
            <span>{`${itemCount}`}</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ShoppingCartIcon;
