
import SortingProduct from '@/components/features/shopping/product/sorting-product';
import FilterDrawer from '@/components/features/shopping/filter/filter-drawer';

import { addSpaceAndCapitalizeFirstLetter } from "@/utils/text";

interface ProductHeaderProps {
  total?: number;
  offset?: number;
  limit?: number;
  category?: string;
}

const ProductHeader = ({
  total = 0,
  limit = 0,
  offset = 0,
  category
}: ProductHeaderProps) => {
  const displayStart = total === 0 ? 0 : offset + 1;
  const displayEnd = Math.min(offset + limit, total);
  const headerText = addSpaceAndCapitalizeFirstLetter(category || 'Shop');

  return (
    <header className="col-span-2 flex size-full items-center justify-between sm:col-span-3">
      <h1 className="text-[2rem] font-bold">{headerText ?? 'Shopping'}</h1>

      <div className="flex items-center justify-center gap-3 lg:gap-6">
        <p className="text-primary">
          Showing {displayStart}-{displayEnd} of {total} products
        </p>
        <SortingProduct />
      </div>

      <div className="bg-shade-200 flex size-8 items-center justify-center rounded-full p-2 lg:hidden">
        <FilterDrawer />
      </div>
    </header>
  );
};

export default ProductHeader;
