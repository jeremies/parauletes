import React, { useEffect, useState } from "react";
import parauletes from "../parauletes.json";
import abreviacions from "../abreviacions-llibres-biblia.json";
import "./Home.css";
import AppBarHome from "../components/AppBarHome";
import Fab from "@mui/material/Fab";
import CachedIcon from "@mui/icons-material/Cached";
import Snackbar from "@mui/material/Snackbar";
import { hitCounter } from "../utils/Utils";
import { Clipboard } from "@capacitor/clipboard";
import { Share } from "@capacitor/share";
import { usePreferencesItem } from "../hooks/usePreferences";
import { LANGUAGE_KEY } from "../utils/Constants";

function reload() {
  window.location.reload();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getCitaCompleta(cita, language) {
  var [llibre, capitol, versets] = cita.split(".");
  var llibreComplet = abreviacions.find(
    (abreviacio) => abreviacio.abreviacio === llibre
  )[`llibre${language.toUpperCase()}`];
  return `${llibreComplet} ${capitol}, ${versets}`;
}

function Home() {
  const [verset, setVerset] = useState();
  const [cita, setCita] = useState();
  const [open, setOpen] = useState(false);
  const [language] = usePreferencesItem(LANGUAGE_KEY);

  useEffect(() => {
    let numeroAleatori = getRandomInt(parauletes.length);

    setVerset(parauletes[numeroAleatori][`verset${language.toUpperCase()}`]);
    setCita(getCitaCompleta(parauletes[numeroAleatori].cita, language));

    hitCounter("requests");
  }, [language]);

  const onCopyToClipboard = async () => {
    await Clipboard.write({
      string: `${verset} (${cita})`,
    });

    setOpen(true);

    hitCounter("copy.parauleta");
  };

  const onShare = async () => {
    await Share.share({
      text: `${verset} (${cita})`,
      dialogTitle: "Compartir la parauleta",
    });

    hitCounter("share.parauleta");
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="home">
      <AppBarHome
        onClickCopy={onCopyToClipboard}
        onClickShare={onShare}
      ></AppBarHome>
      <div className="home-body">
        <p className="verset">{verset}</p>
        <p className="cita">{cita}</p>
        <Fab
          sx={{ position: "absolute", bottom: 20, right: 20 }}
          color="primary"
          onClick={reload}
        >
          <CachedIcon />
        </Fab>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="La parauleta s'ha copiat al portapapers."
      />
    </div>
  );
}

export default Home;
