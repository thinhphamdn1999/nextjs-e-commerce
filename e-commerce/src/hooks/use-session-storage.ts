import { useCallback, useEffect, useState } from 'react';

const useSessionStorage = <T>(key: string, initialValue: T) => {
  const getSessionStorage = useCallback(() => {
    const item = sessionStorage.getItem(key);
    const latestValue = item ? (JSON.parse(item) as T) : initialValue;
    return latestValue;
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>({ ...initialValue });

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);

      try {
        sessionStorage.setItem(key, JSON.stringify(value));
      } catch {
        // If session storage is not working, we can't do anything
      }
    },
    [key]
  );

  const getValue = useCallback(() => {
    try {
      const latestValue = getSessionStorage();
      setStoredValue(latestValue);
      return latestValue;
    } catch {
      // If session storage is not working, return stored value
      return storedValue;
    }
  }, [getSessionStorage, storedValue]);

  const removeValue = useCallback(() => {
    try {
      // Remove item out of session storage
      sessionStorage.removeItem(key);
    } catch {
      // We can't do anything if session storage is not working
    }
  }, [key]);

  useEffect(() => {
    getValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { storedValue, setValue, getValue, removeValue };
};

export default useSessionStorage;
