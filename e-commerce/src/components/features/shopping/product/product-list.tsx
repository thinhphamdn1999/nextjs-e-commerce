import { Product } from '@/types/products';

import { Separator } from '@/components/common/ui/separator';
import ProductCard from '@/components/widgets/card/product-card';
import PaginationWithLinks from '@/components/widgets/pagination/pagination-with-link';


interface ProductProps {
  products: Product[];
  pagination: {
    total: number;
    offset: number;
    limit: number;
  };
}

const ProductList = ({ pagination, products }: ProductProps) => {
  const { total = 0, offset = 0, limit = 0 } = pagination || {};
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPageCount = Math.ceil(total / limit);

  return (
    <>
      {!products || products.length === 0 ? (
        <div className="col-span-2 flex h-full w-full items-center justify-center sm:col-span-3">
          <p className="text-primary text-xl font-bold">No products found</p>
        </div>
      ) : (
        products.map((product) => <ProductCard key={product.id} {...product} />)
      )}

      <div className="col-span-full mt-1 w-full">
        <Separator className="bg-border-foreground" />
      </div>
      <div className="col-span-full mt-4 mb-12 w-full md:mb-20">
        <PaginationWithLinks
          page={currentPage}
          totalPageCount={totalPageCount}
        />
      </div>
    </>
  );
};

export default ProductList;
