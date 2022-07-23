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
import { LocalNotifications } from "@capacitor/local-notifications";
import { Device } from "@capacitor/device";

function reload() {
  window.location.reload();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getCitaCompleta(cita) {
  var [llibre, capitol, versets] = cita.split(".");
  var llibreComplet = abreviacions.find(
    (abreviacio) => abreviacio.abreviacio === llibre
  ).llibreCA;
  return `${llibreComplet} ${capitol}, ${versets}`;
}

function Home() {
  const [verset, setVerset] = useState();
  const [cita, setCita] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let numeroAleatori = getRandomInt(parauletes.length);

    setVerset(parauletes[numeroAleatori].versetCA);
    setCita(getCitaCompleta(parauletes[numeroAleatori].cita));

    Device.getInfo().then((info) => {
      if (info.platform !== "android") {
        return;
      }

      LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: "Parauleta del dia 14:48",
            schedule: {
              on: {
                hour: 14,
                minute: 48,
              },
            },
          },
        ],
      });

      LocalNotifications.getPending().then((result) => console.log(result));

      LocalNotifications.addListener("localNotificationActionPerformed", () => {
        window.location.pathname = "/refresh";
      });
    });

    hitCounter("requests");
  }, []);

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
