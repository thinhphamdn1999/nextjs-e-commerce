import { SlidersHorizontal } from 'lucide-react';

import FilterContent from '@/components/features/shopping/filter/filter-content';

const FilterSection = () => {
  return (
    <div className="border-border-foreground h-fit w-full space-y-6 rounded-[1.25rem] px-6 py-5 max-lg:hidden lg:mb-4 lg:max-w-[18.5rem] lg:border">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Filters</h2>
        <SlidersHorizontal className="bg-background text-gray size-6 rotate-90" />
      </div>

      <FilterContent />
    </div>
  );
};

export default FilterSection;
