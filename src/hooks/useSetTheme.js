import { useContext } from "react";
import { SetThemeContext } from "../context";

export const useSetTheme = () => {
  const setTheme = useContext(SetThemeContext);
  return setTheme;
};
