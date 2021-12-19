import React, { useEffect } from "react";
import AppBarGoBack from "../components/AppBarGoBack";
import Link from "@mui/material/Link";
import { hitCounter } from "../utils/Utils";

import "./About.css";

function About() {
  useEffect(() => {
    hitCounter("about");
  }, []);

  return (
    <div>
      <AppBarGoBack></AppBarGoBack>
      <main className="about-body">
        <h1>Sobre l'App Parauletes</h1>
        <p>
          L'aplicació Parauletes et dóna un verset de la Bíblia a l'atzar.
          L'aplicació Parauletes està dissenyada per ajudar als cristians a
          viure la Paraula de Déu.
        </p>
        <h2>Privacitat</h2>
        <p>
          Aquesta aplicació no usa cookies ni d'altres formes de rastreig de
          l'usuari.
        </p>
        <h2>Open source</h2>
        <p>
          Aquesta aplicació és de codi obert. Pots trobar tot el codi a{" "}
          <Link
            href="https://github.com/jeremies/parauletes"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </Link>
          .
        </p>
        <h2>Sobre el desenvolupador</h2>
        <p>
          Joaquim Monserrat desenvolupa l'aplicació Parauletes al seu temps
          lliure, com una forma de retribuir a l'Església. Pots contactar amb
          ell per correu electrònic:{" "}
          <Link href="mailto:parauletes.app@gmail.com">
            parauletes.app@gmail.com
          </Link>
        </p>
      </main>
    </div>
  );
}

export default About;
