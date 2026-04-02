'use client';

import Link from 'next/link';

import { NavigationMenuItem } from '@/components/common/ui/navigation-menu';
import { usePathname } from 'next/navigation';

interface MenuItemProps {
  title: string;
  url: string;
}

const MenuItem = (item: MenuItemProps) => {
  const path = usePathname();

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        href={item.url}
        className={
          path.includes(item.url)
            ? 'group bg-background hover:bg-muted hover:text-accent-foreground text-active inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors'
            : 'group bg-background hover:bg-muted hover:text-accent-foreground inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm transition-colors'
        }
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

export { MenuItem };
