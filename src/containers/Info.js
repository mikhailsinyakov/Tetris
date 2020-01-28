import React from "react";
import Indicator from "../components/Indicator";
import Shape from "../components/Shape";
import "../stylesheets/Info.css";
import store from "../store";

const Info = ({ gameSituation, togglePause }) => {
  const { nextShape, info } = store.getState();
  const lang = document.documentElement.lang;
  let buttonName;
  if (gameSituation === "paused" || gameSituation === "not started")
    buttonName = lang === "en" ? "PLAY" : "ИГРАТЬ";
  else if (gameSituation === "playing")
    buttonName = lang === "en" ? "PAUSE" : "ПАУЗА";

  return (
    <div className="info">
      <button id="toggle-playing" onClick={togglePause}>
        {buttonName}
      </button>
      <Indicator
        name={lang === "en" ? "next" : "следующая"}
        component={<Shape nextShape={nextShape} />}
      />
      <Indicator
        name={lang === "en" ? "score" : "очков"}
        value={Math.floor(info.score)}
      />
    </div>
  );
};

export default Info;
