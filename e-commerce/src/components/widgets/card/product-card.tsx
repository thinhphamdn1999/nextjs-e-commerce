import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/constants/routes';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/common/ui/card';
import StarRating from '@/components/features/shopping/product/star-rating';
import PriceDisplay from '@/components/features/shopping/product/price-display';

import { cn } from '@/lib/utils';

interface ProductCardProps {
  className?: string;
  id: number;
  thumbnail: string;
  title: string;
  rating: number;
  price: number;
  discountPercentage: number;
}

const ProductCard = ({
  className,
  id,
  thumbnail,
  title,
  rating,
  price,
  discountPercentage
}: ProductCardProps) => {
  return (
    <Card
      className={cn(
        'relative w-full border-0 py-0 shadow-none *:p-0',
        className
      )}
    >
      <Link href={`${ROUTES.SHOP}/${id}`} className="block">
        <figure className="bg-shade-300 relative mb-4 aspect-[86/87] overflow-hidden rounded-[1.25rem]">
          <Image
            fill
            src={thumbnail}
            className="object-cover transition-all duration-300 hover:scale-105"
            alt="Product Image"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, (min-width: 1281px) 20vw"
          />
        </figure>
      </Link>

      <CardHeader>
        <Link href={`${ROUTES.SHOP}/${id}`} className="block">
          <CardTitle className="line-clamp-1 text-base md:text-xl">
            {title}
          </CardTitle>
        </Link>

        <CardDescription className="line-clamp-2 py-0">
          <StarRating rating={rating} className="!my-0" />
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-2 overflow-hidden text-xl font-bold sm:mt-3 md:text-2xl">
        <PriceDisplay
          price={price}
          discountPercentage={discountPercentage}
          className="text-lg sm:text-xl"
          mobile
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
