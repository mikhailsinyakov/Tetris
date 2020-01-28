import React from "react";
import "../stylesheets/Footer.css";

const Footer = () => {
  const lang = document.documentElement.lang;
  const name = {
    en: "Mikhail Sinyakov",
    ru: "Михаил Синяков"
  };
  return (
    <footer>
      <a href="https://github.com/mikhailsinyakov">{name[lang]}</a>
      <a href="https://reactjs.org/docs/create-a-new-react-app.html">
        Create React App
      </a>
      <a href="https://fontawesome.com">Font Awesome</a>
    </footer>
  );
};

export default Footer;
