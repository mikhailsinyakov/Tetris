import React from "react";
import Icon from "../components/Icon";
import store from "../store";
import { changeDialogName } from "../actions";
import "../stylesheets/GameResult.css";

const GameResult = ({ lastResult, records, startGame, username }) => {
  const lang = document.documentElement.lang;
  const personalPlace =
    records.personal.findIndex(record => record.points === lastResult) + 1;
  const overallPlace =
    records.overall.findIndex(
      record => record.points === lastResult && record.username === username
    ) + 1;

  const numWithEnding = num => {
    return num === 1
      ? num + "st"
      : num === 2
      ? num + "nd"
      : num === 3
      ? num + "rd"
      : num + "th";
  };

  let congratulationMsg = "";
  if (overallPlace >= 1 && overallPlace <= 5) {
    if (overallPlace <= 3) {
      congratulationMsg += lang === "en" ? "Congratulations!" : "Поздравляем!";
    }
    congratulationMsg +=
      lang === "en"
        ? `You got ${numWithEnding(overallPlace)} result among all players`
        : `Вы заняли ${overallPlace}е место среди всех игроков`;
  } else if (personalPlace >= 1 && overallPlace <= 3) {
    if (personalPlace === 1) {
      congratulationMsg += lang === "en" ? "Congratulations!" : "Поздравляем!";
    }
    congratulationMsg +=
      lang === "en"
        ? `You got ${numWithEnding(personalPlace)} result`
        : `Это ваш ${personalPlace}й результат`;
  }

  const headerMsg = lang === "en" ? "Game Over" : "Игра Окончена";
  const scoreMsg =
    lang === "en"
      ? `Your score is ${lastResult} points`
      : `Ваш результат - ${lastResult} очков`;
  const buttonMsg = lang === "en" ? "Play Again" : "Играть Снова";

  return (
    <div className="game-result">
      <div className="header">
        <span
          onClick={() => store.dispatch(changeDialogName("menu"))}
          className="back-button"
        >
          <Icon type="back" color="rgba(119, 113, 113)" />
        </span>
        <span>{headerMsg}</span>
      </div>
      <div className="data">
        <div className="result">
          {congratulationMsg ? <p>{congratulationMsg}</p> : ""}
          <p>{scoreMsg}</p>
        </div>
        <button onClick={startGame}>{buttonMsg}</button>
      </div>
    </div>
  );
};

export default GameResult;
