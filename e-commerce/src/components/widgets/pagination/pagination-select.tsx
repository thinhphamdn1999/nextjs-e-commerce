import { useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, ChevronsUpDown } from 'lucide-react';

import { PaginationEllipsis } from '@/components/common/ui/pagination';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/common/ui/popover';
import { Button } from '@/components/common/ui/button';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/common/ui/command';

import useBuildLink from '@/hooks/use-build-link';
import useOutsideClick from '@/hooks/use-outside-click';
import { cn } from '@/lib/utils';

interface PaginationSelectProps {
  totalPage: number;
}

const PaginationSelect = ({ totalPage }: PaginationSelectProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { buildLink } = useBuildLink();
  const dataRef = useRef<HTMLDivElement>(null);
  const page = searchParams.get('page') ?? '1';
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const [isShowSelect, setIsShowSelect] = useState(false);
  const [selectedPage, setSelectedPage] = useState(page);
  const [open, setOpen] = useState(false);

  const handleEllipsisClick = () => {
    setIsShowSelect(true);
  };

  const handleOutsideClick = () => {
    setIsShowSelect(false);
  };

  const handleSelectChange = (currentValue: string) => {
    setSelectedPage(currentValue);
    setOpen(false);
    const newUrl = buildLink([{ key: 'page', value: currentValue }]);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push(newUrl, {
      scroll: false // Prevents scrolling to top on click
    });
  };

  useOutsideClick([ref1, ref2], handleOutsideClick);

  if (!isShowSelect) {
    return <PaginationEllipsis onClick={handleEllipsisClick} />;
  }

  return (
    <div ref={ref1} className="relative z-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[60px] justify-between"
          >
            {selectedPage || 'Select page'}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[60px] p-0" ref={ref2}>
          <Command>
            <CommandList>
              <CommandGroup>
                {Array.from({ length: totalPage }, (_, index) => ({
                  value: (index + 1).toString()
                })).map((page) => (
                  <CommandItem
                    key={page.value}
                    value={page.value}
                    onSelect={handleSelectChange}
                    ref={dataRef}
                  >
                    {page.value}
                    <Check
                      className={cn('ml-auto', {
                        'opacity-0': selectedPage !== page.value,
                        'opacity-100': selectedPage === page.value
                      })}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PaginationSelect;
