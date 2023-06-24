import React, { useEffect, useMemo } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import About from "./pages/About";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Device } from "@capacitor/device";
import { Preferences } from "@capacitor/preferences";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CATALAN, ENGLISH, LANGUAGE_KEY, SPANISH } from "./utils/Constants";
import { useTranslation } from "react-i18next";
import { useTheme } from "./hooks/useTheme";

function App() {
  const [, i18n] = useTranslation("main");
  const theme = useTheme();

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
        },
      }),
    [theme]
  );

  useEffect(() => {
    async function setDefaultLanguage() {
      let { value: language } = await Preferences.get({ key: LANGUAGE_KEY });

      if (language) {
        i18n.changeLanguage(language);
        return;
      }

      ({ value: language } = await Device.getLanguageCode());

      if (![CATALAN, SPANISH, ENGLISH].includes(language)) {
        language = ENGLISH;
      }

      i18n.changeLanguage(language);
      await Preferences.set({
        key: LANGUAGE_KEY,
        value: language,
      });
    }

    setDefaultLanguage();
  }, [i18n]);

  return (
    <ThemeProvider theme={muiTheme}>
      <Paper sx={{ minHeight: "100vh" }} elevation={12}>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="about" element={<About />} />
            <Route path="/refresh" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
