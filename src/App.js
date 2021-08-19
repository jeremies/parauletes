import React, { useEffect, useState } from "react";
import parauletes from "./parauletes.json";
import "./App.css";

function reload() {
  window.location.reload();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [verset, setVerset] = useState();
  const [cita, setCita] = useState();

  useEffect(() => {
    let numeroAleatori = getRandomInt(parauletes.length);

    setVerset(parauletes[numeroAleatori].versetCA);
    setCita(parauletes[numeroAleatori].cita);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{verset}</p>
        <p>{cita}</p>
        <button className="button" onClick={reload}>
          Nou verset
        </button>
        <p>v13</p>
      </header>
    </div>
  );
}

export default App;
