import ProductCardSkeleton from '@/components/common/skeleton/product-card-skeleton';

interface ProductCardListSkeletonProps {
  numberOfProducts?: number;
}

const ProductCardListSkeleton = ({
  numberOfProducts = 0
}: ProductCardListSkeletonProps) => {
  if (numberOfProducts <= 0) {
    return null;
  }

  return Array.from({ length: numberOfProducts || 4 }).map((_, index) => (
    <ProductCardSkeleton key={`product-${index}`} />
  ));
};

export default ProductCardListSkeleton;
