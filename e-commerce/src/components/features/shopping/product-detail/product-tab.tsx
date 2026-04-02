import type { Product } from '@/types/products';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/common/ui/tabs';
import ProductDetailsTab from './product-detail-tab';
import RatingReviewTabs from './product-review-tab';

interface ProductTabSectionProps {
  product: Product;
}

const ProductTabSection = ({ product }: ProductTabSectionProps) => {
  return (
    <div className='min-h-[450px] max-lg:min-h-[800px]'>
      <Tabs defaultValue="details" className="pb-8">
        <TabsList className="w-full">
          <TabsTrigger value="details" className="w-full">
            Product Details
          </TabsTrigger>
          <TabsTrigger value="ratings-reviews" className="w-full">
            Rating & Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <ProductDetailsTab product={product} />
        </TabsContent>
        <TabsContent value="ratings-reviews">
          <RatingReviewTabs reviews={product.reviews} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default ProductTabSection;
