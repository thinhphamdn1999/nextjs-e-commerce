'use client';

import { type ReactNode, useCallback } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/common/ui/pagination';
import PaginationSelect from './pagination-select';

import useBuildLink from '@/hooks/use-build-link';
import { cn } from '@/lib/utils';

export interface PaginationWithLinksProps {
  page: number;
  pageSearchParam?: string;
  totalPageCount: number;
}

const PaginationWithLinks = ({
  page,
  pageSearchParam = 'page',
  totalPageCount
}: PaginationWithLinksProps) => {
  const { buildLink } = useBuildLink();
  const disableNavigation = totalPageCount === 0 || totalPageCount === 1;
  const disablePrevious = page === 1 || disableNavigation;
  const disableNext = page === totalPageCount || disableNavigation;

  const handlePageClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={buildLink([{ key: pageSearchParam, value: i }])}
              isActive={page === i}
              onClick={handlePageClick}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            href={buildLink([{ key: pageSearchParam, value: 1 }])}
            isActive={page === 1}
            onClick={handlePageClick}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationSelect totalPage={totalPageCount} />
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPageCount - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={buildLink([{ key: pageSearchParam, value: i }])}
              isActive={page === i}
              onClick={handlePageClick}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationSelect totalPage={totalPageCount} />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink
            href={buildLink([{ key: pageSearchParam, value: totalPageCount }])}
            isActive={page === totalPageCount}
            onClick={handlePageClick}
          >
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 md:flex-row">
      <Pagination>
        <PaginationContent className="w-full justify-between max-sm:gap-0">
          <PaginationItem>
            <PaginationPrevious
              href={buildLink([
                { key: pageSearchParam, value: Math.max(page - 1, 1) }
              ])}
              aria-disabled={disablePrevious}
              tabIndex={disablePrevious ? -1 : undefined}
              className={cn({
                'pointer-events-none opacity-50': disablePrevious
              })}
              onClick={handlePageClick}
            />
          </PaginationItem>
          <li>
            <ul className="flex flex-row">
              {renderPageNumbers()}
            </ul>
          </li>
          <PaginationItem>
            <PaginationNext
              href={buildLink([
                {
                  key: pageSearchParam,
                  value: Math.min(page + 1, totalPageCount)
                }
              ])}
              aria-disabled={disableNext}
              tabIndex={disableNext ? -1 : undefined}
              className={cn({
                'pointer-events-none opacity-50': disableNext
              })}
              onClick={handlePageClick}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationWithLinks;
