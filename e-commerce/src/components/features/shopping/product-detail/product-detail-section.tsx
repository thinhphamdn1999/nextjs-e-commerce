import { Suspense } from 'react';

import { PROMOTION_PRODUCTS_LIMIT } from '@/constants/skeleton';
import { ROUTES } from '@/constants/routes';
import { Product } from '@/types/products';

import ProductCardListSkeleton from '@/components/common/skeleton/product-card-list-skeleton';
import ProductDetailDescription from './product-detail-description';
import ProductImages from './product-images';
import ProductTabSection from './product-tab';
import RelatedProduct from './related-product';

import BreadCrumbList from '@/components/layout/breadcrumb/breadcrumb-list';

interface ProductDetailSectionProps {
  product: Product;
}

const ProductDetailSection = ({ product }: ProductDetailSectionProps) => {
  return (
    <div>
      <BreadCrumbList
        routes={[
          { text: 'Home', href: ROUTES.HOME },
          { text: 'Shop', href: ROUTES.SHOP },
          { text: product.title }
        ]}
      />
      <div className="grid-row-1 grid gap-10 md:grid-cols-2">
        <ProductImages images={product.images} />
        <ProductDetailDescription product={product} />
      </div>
      <div className="mt-20">
        <ProductTabSection product={product} />
      </div>

      <div className="mt-10 mb-10 grid h-fit w-full grid-cols-2 place-items-center gap-6 md:grid-cols-3 lg:grid-cols-4">
        <Suspense
          fallback={
            <ProductCardListSkeleton
              numberOfProducts={PROMOTION_PRODUCTS_LIMIT}
            />
          }
        >
          <RelatedProduct category={product.category} productId={product.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductDetailSection;
