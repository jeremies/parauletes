import { createContext, useEffect, useState } from "react";
import { DARK, THEME_KEY } from "./utils/Constants";
import { usePreferences } from "./hooks/usePreferences";

export const ThemeContext = createContext({});
export const SetThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const { get, set } = usePreferences();
  const [theme, setTheme] = useState(DARK);

  useEffect(() => {
    async function setInitialTheme() {
      const theme = await get(THEME_KEY);

      if (theme) {
        setTheme(theme);
        return;
      }

      await set(THEME_KEY, DARK);
    }

    setInitialTheme();
  }, []);

  return (
    <SetThemeContext.Provider value={setTheme}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </SetThemeContext.Provider>
  );
};

export default ThemeProvider;
