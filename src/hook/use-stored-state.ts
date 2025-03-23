import { useEffect, useState } from "react";

export function useStoredState<T>(
  key: string,
  initialValue: T | null = null
): [T | null, (value: T | null) => void] {
  // Initialize state with stored value or initial value
  const [state, setState] = useState<T | null>(() => {
    // Always return initial value during SSR
    if (typeof window === 'undefined') return initialValue;

    try {
      const storedValue = sessionStorage.getItem(key);
      if (!storedValue) return initialValue;

      const parsedValue = JSON.parse(storedValue);
      return parsedValue !== null ? parsedValue : initialValue;
    } catch (error) {
      console.debug(`Failed to load stored value for key: ${key}`, error);
      return initialValue;
    }
  });

  // Sync state changes to session storage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      if (state === null) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, JSON.stringify(state));
      }
    } catch (error) {
      console.debug(`Failed to save value for key: ${key}`, error);
    }
  }, [key, state]);

  return [state, setState];
}