import { RefObject, useEffect } from 'react';

const useOutsideClick = (
  refs: RefObject<HTMLElement | null>[],
  callback: () => void
) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        refs.some(
          (ref) => ref.current && !ref.current.contains(event.target as Node)
        )
      ) {
        callback();
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [refs, callback]);
};

export default useOutsideClick;
