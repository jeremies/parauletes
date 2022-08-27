import React, { useEffect } from "react";
import AppBarGoBack from "../components/AppBarGoBack";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import { hitCounter } from "../utils/Utils";
import { Share } from "@capacitor/share";
import googlePlayBadge from "../assets/google-play-badge.png";
import {
  CATALAN,
  ENGLISH,
  googlePlayLink,
  LANGUAGE_KEY,
  SPANISH,
} from "../utils/Constants";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import "./Settings.css";
import { usePreferencesItem } from "../hooks/usePreferences";
import { useTranslation } from "react-i18next";

function Settings() {
  const [language, setLanguage] = usePreferencesItem(LANGUAGE_KEY);
  const [t, i18n] = useTranslation("main");

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

  const handleChange = (event) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
    setLanguage(language);
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
            onChange={handleChange}
          >
            <MenuItem value={CATALAN}>Català</MenuItem>
            <MenuItem value={ENGLISH}>English</MenuItem>
            <MenuItem value={SPANISH}>Español</MenuItem>
          </Select>
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
