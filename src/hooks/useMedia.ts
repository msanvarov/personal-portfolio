import { useEffect, useState } from "react";

const useMedia = <T>(queries: string[], values: T[], defaultValue: T) => {
  const mediaQueryLists = queries.map(query => window.matchMedia(query));
  const getValue = () => {
    const index = mediaQueryLists.findIndex(mql => mql.matches);
    return typeof values[index] !== "undefined" ? values[index] : defaultValue;
  };
  const [value, setValue] = useState(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach(mql => mql.addListener(handler));
    return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
  }, []);

  return value;
};

export default useMedia;
