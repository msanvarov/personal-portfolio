import React from 'react';

export const useLocalStorage = <T>(key: string, startingValue?: T) => {
  if (typeof window === undefined) {
    return [startingValue, undefined];
  }

  const [state, setState] = React.useState(() => {
    try {
      const local = localStorage.getItem(key);

      if (typeof local !== 'string') {
        localStorage.setItem(key, JSON.stringify(startingValue));

        return startingValue;
      } else {
        return JSON.parse(local);
      }
    } catch {
      return startingValue;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(error);
    }
  }, [state]);

  return [state, setState];
};
