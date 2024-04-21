import React, { useEffect } from "react";
import AppBarGoBack from "../components/AppBarGoBack";
import { hitCounter } from "../utils/Utils";

import "./About.css";
import { useTranslation } from "react-i18next";

function About() {
  const [t] = useTranslation("main");

  useEffect(() => {
    hitCounter("about");
  }, []);

  return (
    <div>
      <AppBarGoBack></AppBarGoBack>
      <main className="about-body">
        <h1>{t("about.title")}</h1>
        <h3>{t("about.paragraph-1")}</h3>
        <h3>{t("about.paragraph-2")}</h3>
      </main>
    </div>
  );
}

export default About;
