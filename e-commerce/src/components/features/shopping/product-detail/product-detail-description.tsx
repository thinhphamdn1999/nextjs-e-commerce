'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Minus, Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Product } from '@/types/products';

import StarRating from '@/components/features/shopping/product/star-rating';
import PriceDisplay from '@/components/features/shopping/product/price-display';
import { Button } from '@/components/common/ui/button';

import useCartContext from '@/hooks/use-cart-context';

interface InfoDisplayProps {
  product: Product;
}

const InfoDisplay = ({ product }: InfoDisplayProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartContext();
  const { data: session } = useSession();

  const handleQuantityChange = (change: number) => {
    if (quantity <= 1 && change < 0) {
      // Prevent quantity from going below 1
      return;
    }

    setQuantity(quantity + change);
  };

  const handleAddToCart = () => {
    if (!session?.user) {
      toast.error('Please log in to use this action.');
      return;
    }

    addToCart(product, quantity);
    toast('Product added to cart successfully!', {
      description: 'Please check your cart for details.'
    });

    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <div className="divide-secondary/10 flex flex-col divide-y">
      <header className="pb-6">
        <h2 className="font-integral text-2xl leading-[1.2] font-bold md:text-[2rem] lg:text-[2.5rem]">
          {product.title}
        </h2>

        <StarRating rating={product.rating} />

        <PriceDisplay
          price={product.price}
          discountPercentage={product.discountPercentage}
        />

        <p className="text-primary mt-3 leading-[1.375rem] max-md:text-sm">
          {product.description}
        </p>
      </header>

      <div className="space-y-4 py-6 text-sm">
        <h3 className="text-primary">Tags</h3>
        <ul className="mt-2 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <li
              key={tag}
              className="bg-shade-200 text-primary rounded-full px-5 py-3 capitalize"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-3 py-6 md:gap-4">
        <div className="bg-secondary/10 flex items-center justify-center gap-6 rounded-full px-4 py-3.5 font-medium md:py-4 lg:gap-8 lg:px-5 lg:py-4">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => handleQuantityChange(-1)}
            className="cursor-pointer active:scale-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Minus className="size-4 md:size-6" />
          </button>

          <span>{quantity}</span>

          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => {
              handleQuantityChange(1);
            }}
            className="cursor-pointer active:scale-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="size-4 md:size-6" />
          </button>
        </div>

        <div className="w-full">
          <Button
            onClick={handleAddToCart}
            className="size-full max-md:py-3.5 lg:py-4"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoDisplay;
