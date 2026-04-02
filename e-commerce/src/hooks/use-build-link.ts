import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface UrlProp {
  key?: string;
  value?: string | number | null;
}

const useBuildLink = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildLink = useCallback(
    (params: UrlProp[]) => {
      const newParamString = params
        .map(({ key, value }) => {
          if (value === undefined || value === null || key === undefined) {
            return null;
          }

          return `${key}=${String(value)}`;
        })
        .filter(Boolean)
        .join('&');
      if (!searchParams) return `${pathname}?${newParamString}`;
      const newSearchParams = new URLSearchParams(searchParams);

      params.forEach(({ key, value }) => {
        if (value === undefined || value === null) {
          newSearchParams.delete(key as string);
        } else {
          newSearchParams.set(key as string, String(value));
        }
      });

      const isIncludePage = params.some(({ key }) => key === 'page');
      if (!isIncludePage) {
        newSearchParams.delete('page');
      }

      return `${pathname}?${newSearchParams.toString()}`;
    },
    [searchParams, pathname]
  );

  return { buildLink };
};

export default useBuildLink;
