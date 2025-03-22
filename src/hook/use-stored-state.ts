import { useEffect, useState } from "react";

export function useStoredState<T>(
  key: string,
  initialValue: T | null = null
): [T | null, (value: T | null) => void] {
  // Initialize state with value from SessionStorage
  const [state, setState] = useState<T | null>(() => {
    if (typeof window === "undefined") return initialValue;
    
    const storedValue = sessionStorage.getItem(key);
    if (!storedValue) return initialValue;
    
    try {
      return JSON.parse(storedValue);
    } catch {
      return initialValue;
    }
  });

  // Update SessionStorage when state changes
  useEffect(() => {
    if (state === null) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
}