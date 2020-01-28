import React from "react";
import "../stylesheets/Footer.css";

const Footer = ({ changeLanguage }) => {
  const lang = document.documentElement.lang;
  const name = {
    en: "Mikhail Sinyakov",
    ru: "Михаил Синяков"
  };
  const newLanguageMsg = {
    en: "Русский язык",
    ru: "English language"
  };
  const onClick = e => {
    e.preventDefault();
    changeLanguage(lang === "en" ? "ru" : "en");
  };

  return (
    <footer>
      <a href="https://github.com/mikhailsinyakov">{name[lang]}</a>
      <a href="https://reactjs.org/docs/create-a-new-react-app.html">
        Create React App
      </a>
      <a href="https://fontawesome.com">Font Awesome</a>
      <button className="choose-language" onClick={onClick}>
        {newLanguageMsg[lang]}
      </button>
    </footer>
  );
};

export default Footer;
