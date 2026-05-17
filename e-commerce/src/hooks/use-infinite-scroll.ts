import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions<T> {
  initialItems: T[];
  total: number;
  fetchMore: (offset: number) => Promise<T[]>;
  rootMargin?: string;
}

const useInfiniteScroll = <T>({
  initialItems,
  total,
  fetchMore,
  rootMargin = '200px',
}: UseInfiniteScrollOptions<T>) => {
  const [items, setItems] = useState<T[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  const loadMore = async () => {
    if (isLoadingRef.current || items.length >= total) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const newItems = await fetchMore(items.length);
      setItems((prev) => [...prev, ...newItems]);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  };

  const loadMoreRef = useRef(loadMore);
  loadMoreRef.current = loadMore;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMoreRef.current();
      },
      { rootMargin }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { items, isLoading, sentinelRef, hasMore: items.length < total };
};

export default useInfiniteScroll;
