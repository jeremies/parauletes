import React, { useEffect, useState } from "react";
import parauletes from "./parauletes.json";
import abreviacions from "./abreviacions-llibres-biblia.json";
import "./Home.css";
import logo from "./logo.svg";

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

  useEffect(() => {
    let numeroAleatori = getRandomInt(parauletes.length);

    setVerset(parauletes[numeroAleatori].versetCA);
    setCita(getCitaCompleta(parauletes[numeroAleatori].cita));

    if (!window.location.hostname === "localhost") {
      fetch("https://api.countapi.xyz/hit/parauletes.netlify.app/requests");
    }
  }, []);

  return (
    <div className="home-body">
      <div className="title">
        <img src={logo} className="icon" alt="logo" />
        <div className="title-text">Parauletes</div>
      </div>
      <p className="verset">{verset}</p>
      <p className="cita">{cita}</p>
      <button className="button" onClick={reload}>
        Nou verset
      </button>
    </div>
  );
}

export default Home;
