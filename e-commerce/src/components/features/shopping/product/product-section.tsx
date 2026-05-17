import { getProductList } from '@/actions/product';
import ProductHeader from './product-header';
import InfiniteProductList from './infinite-product-list';

interface ProductSectionProps {
  urlParams: {
    page?: string;
    min?: string;
    max?: string;
    category?: string;
    sortBy?: string;
    orderBy?: string;
  };
}

const ProductSection = async ({ urlParams }: ProductSectionProps) => {
  const { min, max, category, orderBy, sortBy } = urlParams;

  const { products, pagination } = await getProductList({
    offset: 0,
    minPrice: min,
    maxPrice: max,
    category,
    sortBy,
    order: orderBy
  });

  return (
    <>
      <ProductHeader
        category={category}
        total={pagination?.total}
        offset={pagination?.offset}
        limit={pagination?.limit}
      />
      <InfiniteProductList
        initialProducts={products}
        initialPagination={pagination}
        filters={{ min, max, category, sortBy, orderBy }}
      />
    </>
  );
};

export default ProductSection;
