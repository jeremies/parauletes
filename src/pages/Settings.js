import React, { useEffect } from "react";
import AppBarGoBack from "../components/AppBarGoBack";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";
import { hitCounter } from "../utils/Utils";

import "./Settings.css";

function Settings() {
  useEffect(() => {
    hitCounter("settings");
  }, []);

  const onShareApp = () => {
    navigator.share({
      text: "https://parauletes.netlify.app",
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
      </main>
    </div>
  );
}

export default Settings;
