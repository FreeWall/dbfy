import { useEffect, useState } from 'react';

function getStorageValue<S>(key: string, defaultValue: S): S {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  }

  return defaultValue;
}

export function useLocalStorage<S>(
  key: string,
  defaultValue: S,
  prefix = 'dbfy_',
): [S, (value: S) => void] {
  const [value, setValue] = useState(defaultValue);
  key = prefix + key;

  useEffect(() => {
    setValue(getStorageValue(key, defaultValue));
  }, [defaultValue, key]);

  return [
    value,
    (value: S): void => {
      setValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    },
  ];
}
