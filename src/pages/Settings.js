import React, { useEffect } from "react";
import AppBarGoBack from "../components/AppBarGoBack";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import { hitCounter } from "../utils/Utils";
import { Share } from "@capacitor/share";
import googlePlayBadge from "../assets/google-play-badge.png";
import { googlePlayLink } from "../utils/Constants";

import "./Settings.css";

function Settings() {
  useEffect(() => {
    hitCounter("settings");
  }, []);

  const onShareApp = async () => {
    await Share.share({
      url: googlePlayLink,
      dialogTitle: "Compartir l'app",
    });

    hitCounter("share.app");
  };

  return (
    <div>
      <AppBarGoBack></AppBarGoBack>
      <main className="settings-body">
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={onShareApp}
        >
          Compartir App
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
