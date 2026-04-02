import ProductCardListSkeleton from "@/components/common/skeleton/product-card-list-skeleton";
import { Skeleton } from "@/components/common/ui/skeleton";
import FilterContent from "@/components/features/shopping/filter/filter-content";
import ProductSection from "@/components/features/shopping/product/product-section";
import BreadCrumbList from "@/components/layout/breadcrumb/breadcrumb-list";
import { PAGE_LIMIT } from "@/constants/page";
import { SlidersHorizontal } from "lucide-react";
import { Suspense } from "react";

interface ProductListPageProps {
  searchParams: Promise<{
    page: string | undefined;
    min: string | undefined;
    max: string | undefined;
    category: string | undefined;
    sortBy: string | undefined;
    orderBy: string | undefined;
  }>;
}

export default async function ShopPage({ searchParams }: ProductListPageProps) {
  const params = await searchParams;

  return (
    <section>
      <BreadCrumbList
        routes={[{ text: 'Home', href: '/' }, { text: 'Shop' }]}
      />
      <div className="relative grid gap-5 lg:grid-cols-4">
        <div className="border-border-foreground h-fit w-full space-y-6 rounded-[1.25rem] px-6 py-5 max-lg:hidden lg:mb-4 lg:max-w-[18.5rem] lg:border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Filters</h2>
            <SlidersHorizontal className="bg-background text-gray size-6 rotate-90" />
          </div>
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <FilterContent />
          </Suspense>
        </div>
        <div className="grid h-fit w-full grid-cols-2 place-items-center gap-5 sm:grid-cols-3 lg:col-span-3 lg:col-start-2 lg:grid-cols-subgrid">
          <Suspense
            key={`product-list-${JSON.stringify(params)}`}
            fallback={<ProductCardListSkeleton numberOfProducts={PAGE_LIMIT} />}
          >
            <ProductSection urlParams={params} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
