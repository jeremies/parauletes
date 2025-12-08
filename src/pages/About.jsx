import React, { useEffect } from "react";
import AppBarGoBack from "../components/AppBarGoBack";
import { hitCounter } from "../utils/Utils";
import { App } from "@capacitor/app";

import "./About.css";
import { useTranslation } from "react-i18next";

function About() {
  const [t] = useTranslation("main");
  const [version, setVersion] = React.useState("");

  useEffect(() => {
    hitCounter("about");
  }, []);

  useEffect(() => {
    App.getInfo().then((info) => {
      setVersion(info.version);
    });
  }, []);

  return (
    <div>
      <AppBarGoBack></AppBarGoBack>
      <main className="about-body">
        <h1>{t("about.title")}</h1>
        <h3>{t("about.paragraph-1")}</h3>
        <h3>{t("about.paragraph-2")}</h3>
        <h1>{t("about.credits.title")}</h1>
        <h3>
          {t("about.credits.paragraph-1")}{" "}
          <a
            className="link-dina"
            href="https://www.dinacomics.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            dinacomics.com
          </a>
        </h3>
        <h3>{t("about.credits.paragraph-2")}</h3>
        <p>v. {version}</p>
      </main>
    </div>
  );
}

export default About;
