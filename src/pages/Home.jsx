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
import { LANGUAGE_KEY, SPANISH } from "../utils/Constants";
import { useTranslation } from "react-i18next";
import { Device } from "@capacitor/device";

const info = Device.getInfo();

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
  const [counter, setCounter] = useState(0);
  const [verset, setVerset] = useState();
  const [cita, setCita] = useState();
  const [open, setOpen] = useState(false);
  const [language] = usePreferencesItem(LANGUAGE_KEY, SPANISH); // TODO here it takes default value SPANISH for the first time there is a race condition between app.js setting language and here reading language.
  const [t] = useTranslation("main");

  useEffect(() => {
    let numeroAleatori = getRandomInt(parauletes.length);

    setVerset(parauletes[numeroAleatori][`verset${language.toUpperCase()}`]);
    setCita(getCitaCompleta(parauletes[numeroAleatori].cita, language));

    hitCounter("requests");
  }, [language, counter]);

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
      dialogTitle: t("home.share-dialog-title"),
    });

    hitCounter("share.parauleta");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reload = async () => {
    info.then((info) => {
      setCounter((counter) => counter + 1);
      if (counter > 0 && counter % 10 === 0 && info.platform === "web") {
        window.location.reload();
      }
    });
  };

  return (
    <div className="home">
      <AppBarHome
        onClickCopy={onCopyToClipboard}
        onClickShare={onShare}
      ></AppBarHome>
      <div className="home-body">
        holahola
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
        message={t("home.message-copied-ok")}
      />
    </div>
  );
}

export default Home;
