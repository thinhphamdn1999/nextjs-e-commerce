import { SlidersHorizontal, X } from 'lucide-react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/common/ui/drawer';
import FilterContent from '@/components/features/shopping/filter/filter-content';

const FilterDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger aria-label="filter-drawer">
        <SlidersHorizontal className="text-secondary size-4 rotate-90" />
      </DrawerTrigger>

      <DrawerContent className="pb-6 lg:hidden">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <DrawerTitle>Filter</DrawerTitle>

          <DrawerClose>
            <X />
          </DrawerClose>
        </DrawerHeader>

        <div className="flex flex-col gap-3 px-4">
          <FilterContent />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
