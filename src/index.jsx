import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import main_ca from "./translations/ca/main.json";
import main_es from "./translations/es/main.json";
import main_en from "./translations/en/main.json";
import ThemeProvider from "./context";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en",
  resources: {
    ca: {
      main: main_ca,
    },
    en: {
      main: main_en,
    },
    es: {
      main: main_es,
    },
  },
});

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </I18nextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
