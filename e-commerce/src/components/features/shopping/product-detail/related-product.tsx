import ProductCard from '@/components/widgets/card/product-card';

import { getProductList } from '@/actions/product';

interface RelatedProductProps {
  category?: string;
  productId?: number;
}

const RelatedProduct = async ({ category, productId }: RelatedProductProps) => {
  const { products } = await getProductList({
    category
  });

  const relatedProducts = products
    .filter((product) => product.id !== productId)
    .slice(0, 4);

  return (
    <>
      <div className="col-span-2 flex items-center justify-center sm:col-span-3 lg:col-span-4">
        <h2 className="text-[2rem] font-bold">You might also like</h2>
      </div>
      {!relatedProducts || relatedProducts.length === 0 ? (
        <div className="col-span-2 flex h-full w-full items-center justify-center sm:col-span-3">
          <p className="text-primary text-xl font-bold">No products found</p>
        </div>
      ) : (
        relatedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))
      )}
    </>
  );
};

export default RelatedProduct;
