import { useEffect, useState } from "react";

export const useDebounce = (value, ms) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, ms);

    return () => {
      clearTimeout(timeout);
    };
  }, [ms, value]);

  return debounceValue;
};
