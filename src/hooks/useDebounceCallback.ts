import { useEffect } from "react";

export default function useDebounceCallback(
  callback: () => void,
  delay: number,
  dependency: number | string | boolean | null | symbol,
  toggle: boolean = false
) {
  useEffect(() => {
    if (toggle === true) {
      const debounceCallback = setTimeout(callback, delay);
      return () => clearTimeout(debounceCallback);
    } else if (toggle === false) {
      const debounceCallback = setTimeout(callback, delay);
      return () => clearTimeout(debounceCallback);
    }
  }, [callback, delay, dependency, toggle]);
}
