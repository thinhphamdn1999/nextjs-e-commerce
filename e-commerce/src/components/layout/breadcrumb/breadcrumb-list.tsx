import { Fragment } from 'react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/common/ui/breadcrumb';

interface BreadCrumbListProps {
  text: string;
  href?: string;
}

const BreadCrumbList = ({ routes }: { routes: BreadCrumbListProps[] }) => {
  const lastIndex = routes.length - 1;
  const previousRoutes = routes.slice(0, lastIndex);
  const currentRoute = routes[lastIndex];

  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        {previousRoutes.map(({ text, href }) => (
          <Fragment key={text}>
            <BreadcrumbItem>
              <Link href={href || '#'}>{text}</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{currentRoute.text}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbList;
