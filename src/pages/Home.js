import React, { useEffect, useState } from "react";
import parauletes from "../parauletes.json";
import abreviacions from "../abreviacions-llibres-biblia.json";
import "./Home.css";
import AppBarHome from "../components/AppBarHome";
import Fab from "@mui/material/Fab";
import CachedIcon from "@mui/icons-material/Cached";
import Snackbar from "@mui/material/Snackbar";

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

    if (
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "dev--parauletes.netlify.app"
    ) {
      fetch("https://api.countapi.xyz/hit/parauletes.netlify.app/requests");
    }
  }, []);

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(`${verset} (${cita})`).then(() => {
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="home">
      <AppBarHome onClickCopy={onCopyToClipboard}></AppBarHome>
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
