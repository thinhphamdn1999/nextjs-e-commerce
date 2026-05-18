'use client';

import { Pagination } from '@/types/pagination';
import { Product } from '@/types/products';

import { Button } from '@/components/common/ui/button';
import { Separator } from '@/components/common/ui/separator';
import ProductCard from '@/components/widgets/card/product-card';

import useInfiniteScroll from '@/hooks/use-infinite-scroll';

interface InfiniteProductListProps {
  initialProducts: Product[];
  initialPagination: Pagination;
  filters: {
    min?: string;
    max?: string;
    category?: string;
    sortBy?: string;
    orderBy?: string;
  };
}

const InfiniteProductList = ({
  initialProducts,
  initialPagination,
  filters,
}: InfiniteProductListProps) => {
  const { items: products, isLoading, hasMore, sentinelRef, loadMore, shouldAutoLoad } = useInfiniteScroll<Product>({
    initialItems: initialProducts,
    total: initialPagination.total,
    fetchMore: async (offset) => {
      const params = new URLSearchParams({ offset: String(offset) });
      if (filters.min) params.set('minPrice', filters.min);
      if (filters.max) params.set('maxPrice', filters.max);
      if (filters.category) params.set('category', filters.category);
      if (filters.sortBy) params.set('sortBy', filters.sortBy);
      if (filters.orderBy) params.set('order', filters.orderBy);

      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      return data.data.products;
    },
    maxAutoPages: 2,
  });

  if (!products.length) {
    return (
      <div className="col-span-full flex h-full w-full items-center justify-center">
        <p className="text-primary text-xl font-bold">No products found</p>
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
      <div className="col-span-full mt-1 w-full">
        <Separator className="bg-border-foreground" />
      </div>
      <div className="col-span-full flex items-center justify-center py-6">
        {shouldAutoLoad ? (
          <div ref={sentinelRef}>
            {isLoading && (
              <p className="text-muted-foreground text-sm">Loading more...</p>
            )}
          </div>
        ) : hasMore ? (
          <Button
            onClick={loadMore}
            disabled={isLoading}
            variant="outline"
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </Button>
        ) : (
          <p className="text-muted-foreground text-sm">All products loaded</p>
        )}
      </div>
    </>
  );
};

export default InfiniteProductList;
