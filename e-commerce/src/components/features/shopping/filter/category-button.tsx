'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import useBuildLink from '@/hooks/use-build-link';

import { cn } from '@/lib/utils';

interface CategoryButtonProps {
  name: string;
  slug: string;
}

const CategoryButton = ({ name, slug }: CategoryButtonProps) => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';
  const { buildLink } = useBuildLink();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link
      key={slug}
      scroll={false}
      href={buildLink([{ key: 'category', value: slug }])}
      className={cn(
        `flex items-center justify-between gap-2 py-1 transition-colors hover:no-underline`,
        selectedCategory === slug
          ? 'text-secondary font-medium'
          : 'text-secondary/60 hover:text-secondary/80'
      )}
      onClick={handleClick}
    >
      <span className="capitalize">{name}</span>
      <ChevronRight className="size-4" />
    </Link>
  );
};

export default CategoryButton;
