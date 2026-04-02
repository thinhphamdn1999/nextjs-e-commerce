import { Suspense } from 'react';

import { Skeleton } from '@/components/common/ui/skeleton';
import { Separator } from '@/components/common/ui/separator';
import CategoryFilter from '@/components/features/shopping/filter/category-filter';
import PriceFilter from '@/components/features/shopping/filter/price-filter';

const FilterContent = () => {
  return (
    <>
      <Suspense fallback={<Skeleton className="h-10 w-full" />}>
        <div className="w-full">
          <Separator className="bg-border-foreground" />
        </div>
        <CategoryFilter />
      </Suspense>
      <div className="w-full">
        <Separator className="bg-border-foreground" />
      </div>
      <PriceFilter />
    </>
  );
};

export default FilterContent;
