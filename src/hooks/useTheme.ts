import { useContext } from "react";
import { ThemeContext } from "styled-components";

const useTheme = <T>() => {
  const theme = useContext<T>(ThemeContext);
  return theme || {};
};

export default useTheme;
