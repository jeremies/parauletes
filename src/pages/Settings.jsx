import React, { useEffect } from "react";
import AppBarGoBack from "../components/AppBarGoBack";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import { hitCounter } from "../utils/Utils";
import { Share } from "@capacitor/share";
import googlePlayBadge from "../assets/google-play-badge.png";
import {
  CATALAN,
  DARK,
  ENGLISH,
  googlePlayLink,
  LANGUAGE_KEY,
  LIGHT,
  SPANISH,
  THEME_KEY,
} from "../utils/Constants";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import "./Settings.css";
import { usePreferences, usePreferencesItem } from "../hooks/usePreferences";
import { useTranslation } from "react-i18next";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../hooks/useTheme";
import { useSetTheme } from "../hooks/useSetTheme";

function Settings() {
  const [language, setLanguage] = usePreferencesItem(LANGUAGE_KEY);
  const [t, i18n] = useTranslation("main");
  const setTheme = useSetTheme();
  const theme = useTheme();
  const { set } = usePreferences();

  useEffect(() => {
    hitCounter("settings");
  }, []);

  const onShareApp = async () => {
    await Share.share({
      url: googlePlayLink,
      dialogTitle: t("settings.share-app"),
    });

    hitCounter("share.app");
  };

  const handleChangeLanguage = (event) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  const handleTheme = (event, newTheme) => {
    if (newTheme) {
      set(THEME_KEY, newTheme);
      setTheme(newTheme);
    }
  };

  return (
    <div>
      <AppBarGoBack></AppBarGoBack>
      <main className="settings-body">
        <FormControl sx={{ margin: 2 }}>
          <InputLabel id="select-label">{t("settings.language")}</InputLabel>
          <Select
            labelId="select-label"
            value={language}
            label={t("settings.language")}
            onChange={handleChangeLanguage}
          >
            <MenuItem value={CATALAN}>Català</MenuItem>
            <MenuItem value={ENGLISH}>English</MenuItem>
            <MenuItem value={SPANISH}>Español</MenuItem>
          </Select>
          <Typography mt={2} variant="button" display="block" gutterBottom>
            {t("settings.mode")}
          </Typography>
          <ToggleButtonGroup value={theme} exclusive onChange={handleTheme}>
            <ToggleButton value={LIGHT}>
              <LightModeIcon sx={{ marginRight: 1 }} />
              {t("settings.light")}
            </ToggleButton>
            <ToggleButton value={DARK}>
              <DarkModeIcon sx={{ marginRight: 1 }} />
              {t("settings.dark")}
            </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>

        <Button
          className="share-app"
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={onShareApp}
          sx={{ margin: 2 }}
        >
          {t("settings.share-app")}
        </Button>
        <a href={googlePlayLink} target="_blank" rel="noreferrer noopener">
          <img
            alt="Disponible a Google Play"
            src={googlePlayBadge}
            className="badge"
          />
        </a>
      </main>
    </div>
  );
}

export default Settings;
