import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/common/ui/accordion';
import CategoryButton from '@/components/features/shopping/filter/category-button';

import { getCategoryList } from '@/actions/category';

const CategoryFilter = async () => {
  const categories = await getCategoryList();

  return (
    <div>
      <Accordion type="multiple" defaultValue={['category']}>
        <AccordionItem value="category">
          <AccordionTrigger>
            <h2 className="text-xl font-bold">Category</h2>
          </AccordionTrigger>
          <AccordionContent className="no-scrollbar flex max-h-[calc(100dvh-26rem)] flex-col gap-5 overflow-y-scroll text-left">
            {!categories || categories.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-primary text-sm">No categories available</p>
              </div>
            ) : (
              categories.map(({ slug, name }) => (
                <CategoryButton name={name} slug={slug} key={slug} />
              ))
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CategoryFilter;
