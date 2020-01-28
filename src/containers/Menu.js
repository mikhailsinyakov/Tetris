import React from "react";
import store from "../store";
import { changeDialogName } from "../actions";
import "../stylesheets/Menu.css";

const Menu = ({ startGame }) => {
  const lang = document.documentElement.lang;

  return (
    <div className="menu">
      <button onClick={startGame}>{lang === "en" ? "Play" : "Играть"}</button>
      <button onClick={() => store.dispatch(changeDialogName("login"))}>
        {lang === "en" ? "Login" : "Изменить ник"}
      </button>
      <button onClick={() => store.dispatch(changeDialogName("records"))}>
        {lang === "en" ? "Records" : "Рекорды"}
      </button>
      <button onClick={() => store.dispatch(changeDialogName("controls"))}>
        {lang === "en" ? "Controls" : "Управление"}
      </button>
    </div>
  );
};

export default Menu;
