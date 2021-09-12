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
      <div>
        <svg x="0px" y="0px" viewBox="0 0 103.19 122.88" className="icon">
          <g>
            <path
              class="st0"
              d="M17.16,0h82.72c1.82,0,3.31,1.49,3.31,3.31v92.32c-0.15,2.58-3.48,2.64-7.07,2.48H15.94 c-4.98,0-9.05,4.07-9.05,9.05c0,4.98,4.07,9.05,9.05,9.05l80.17,0v-9.63l7.07,0v12.24c0,2.23-1.82,4.05-4.05,4.05l-82.85,0 C7.33,122.88,0,115.55,0,106.59V17.16C0,7.72,7.72,0,17.16,0L17.16,0z M75.38,33.69v12.02H58.79v37.03H46.77V45.71H30.18V33.69 h16.59V19.02h12.02v14.68H75.38L75.38,33.69z"
            />
          </g>
        </svg>
      </div>
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
