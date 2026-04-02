import { Suspense } from 'react';
import Link from 'next/link';

import { PROMOTION_PRODUCTS_LIMIT } from '@/constants/skeleton';
import { ROUTES } from '@/constants/routes';

import ProductPromotionList from '@/components/features/home/product-promotion-list';
import { Button } from '@/components/common/ui/button';
import ProductCardListSkeleton from '@/components/common/skeleton/product-card-list-skeleton';

interface ProductPromotionSectionProps {
  title: string;
  id: string;
}

const ProductPromotionSection = async ({
  title,
  id
}: ProductPromotionSectionProps) => {
  return (
    <div
      id={id}
      className="container mx-auto mt-10 mb-10 grid h-fit w-full grid-cols-2 place-items-center gap-6 px-3 md:grid-cols-3 lg:grid-cols-4"
    >
      <div className="col-span-2 flex items-center justify-center sm:col-span-3 lg:col-span-4">
        <h2 className="text-[2rem] font-bold">{title}</h2>
      </div>
      <Suspense
        fallback={
          <ProductCardListSkeleton
            numberOfProducts={PROMOTION_PRODUCTS_LIMIT}
          />
        }
      >
        <ProductPromotionList />
      </Suspense>
      <div className="col-span-full mt-4 mb-12 w-full md:mb-20">
        <div className="flex items-center justify-center">
          <Link
            href={ROUTES.SHOP}
            className="flex w-full items-center justify-center"
          >
            <Button
              className="border-border-foreground w-full border lg:w-auto"
              size="lg"
              variant="ghost"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductPromotionSection;
