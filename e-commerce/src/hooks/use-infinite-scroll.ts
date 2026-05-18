import { useEffect, useRef, useState } from 'react';

interface UseInfiniteScrollOptions<T> {
  initialItems: T[];
  total: number;
  fetchMore: (offset: number) => Promise<T[]>;
  rootMargin?: string;
  maxAutoPages?: number;
}

const useInfiniteScroll = <T>({
  initialItems,
  total,
  fetchMore,
  rootMargin = '200px',
  maxAutoPages
}: UseInfiniteScrollOptions<T>) => {
  const [items, setItems] = useState<T[]>(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [autoLoadCount, setAutoLoadCount] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  const hasMore = items.length < total;
  const shouldAutoLoad =
    maxAutoPages === undefined || autoLoadCount < maxAutoPages;

  const loadMore = async () => {
    if (isLoadingRef.current || !hasMore) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const newItems = await fetchMore(items.length);
      setItems((prev) => [...prev, ...newItems]);
      setAutoLoadCount((prev) => prev + 1);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  };

  const loadMoreRef = useRef(loadMore);
  loadMoreRef.current = loadMore;

  useEffect(() => {
    if (!shouldAutoLoad) return;
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
  }, [shouldAutoLoad, rootMargin]);

  return { items, isLoading, hasMore, sentinelRef, loadMore, shouldAutoLoad };
};

export default useInfiniteScroll;
