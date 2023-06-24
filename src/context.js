import { createContext, useState } from "react";

export const ThemeContext = createContext({});
export const SetThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  return (
    <SetThemeContext.Provider value={setTheme}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </SetThemeContext.Provider>
  );
};

export default ThemeProvider;
