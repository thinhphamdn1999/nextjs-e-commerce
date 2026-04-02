'use client';

import { Menu } from 'lucide-react';

import { Accordion } from '@/components/common/ui/accordion';
import { Button } from '@/components/common/ui/button';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/common/ui/sheet';
import Logo from './logo';
import RightNav from './right-nav';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MENU_LIST } from '@/constants/page';

const MobileHeader = () => {
  const path = usePathname();

  return (
    <div className="block px-3 lg:hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                id="nav-menu"
                aria-label="nav-menu"
                variant="outline"
                size="icon"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto" side="left">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-4"
                >
                  {MENU_LIST.map((item) => (
                    <SheetClose key={item.title} asChild>
                      <Link
                        key={item.title}
                        href={item.url}
                        className={path.includes(item.url) ? 'text-active' : ''}
                      >
                        {item.title}
                      </Link>
                    </SheetClose>
                  ))}
                </Accordion>
              </div>
            </SheetContent>
          </Sheet>
          <Logo />
        </div>
        <RightNav />
      </div>
    </div>
  );
};

export default MobileHeader;
