import { Separator } from '@/components/common/ui/separator';
import HeroSection from '@/components/features/home/hero-section';
import ProductPromotionSection from '@/components/features/home/product-promotion-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductPromotionSection title="NEW ARRIVALS" id="new-arrivals" />
      <div className="container mx-auto px-3">
        <Separator className="bg-border-foreground" />
      </div>
      <ProductPromotionSection title="ON SALE" id="on-sale" />
    </>
  );
}
