import React from "react";
import AppBarSettings from "../components/AppBarSettings";
import Button from "@mui/material/Button";
import ShareIcon from "@mui/icons-material/Share";

import "./Settings.css";

function Settings() {
  const onShareApp = () => {
    navigator.share({
      text: "https://parauletes.netlify.app",
    });
  };

  return (
    <div>
      <AppBarSettings></AppBarSettings>
      <main className="settings-body">
        <h2>Who are we?</h2>
        <p>That feels like an existential question, don't you think?</p>
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
