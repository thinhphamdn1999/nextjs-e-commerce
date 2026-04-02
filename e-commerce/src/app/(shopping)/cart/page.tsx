import { createMetadata } from '@/utils/metadata';

import BreadCrumbList from '@/components/layout/breadcrumb/breadcrumb-list';
import CartOrderSummary from '@/components/features/shopping/cart/cart-order-summary';
import CartSection from '@/components/features/shopping/cart/cart-section';
import { BASE_URL } from '@/constants/url';
import { ROUTES } from '@/constants/routes';

export const metadata = createMetadata({
  title: 'Cart',
  description: 'View and manage the products in your shopping cart on Shop.co',
  keywords: ['cart', 'shopping cart', 'Shop.co', 'checkout'],
  url: `${BASE_URL}${ROUTES.CART}`,
  imageAlt: 'Shop.co Cart'
});

export default function CartPage() {
  return (
    <section>
      <BreadCrumbList
        routes={[{ text: 'Home', href: '/' }, { text: 'Cart' }]}
      />
      <div className="grid gap-5 space-y-5 pb-20 sm:space-y-6 lg:grid-cols-[1fr_40%]">
        <h2 className="font-integral text-[2rem] md:text-4xl lg:col-span-2 lg:text-[3rem]">
          Your Cart
        </h2>
        <CartSection />
        <CartOrderSummary />
      </div>
    </section>
  );
}
