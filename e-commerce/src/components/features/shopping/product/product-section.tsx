import { PAGE_LIMIT } from '@/constants/page';

import { getProductList } from '@/actions/product';
import ProductHeader from './product-header';
import ProductList from './product-list';

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
  const { page, min, max, category, orderBy, sortBy } = urlParams;
  const offset = page ? (Number(page) - 1) * PAGE_LIMIT : 0;

  const { products, pagination } = await getProductList({
    offset,
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
      <ProductList pagination={pagination} products={products} />
    </>
  );
};

export default ProductSection;
