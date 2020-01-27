import React from "react";
import "../stylesheets/Icon.css";

const Icon = ({ type, color }) => {
  const filename = (() => {
    let name = "";
    for (const letter of type) {
      if (letter === letter.toUpperCase()) {
        name += "-";
        name += letter.toLowerCase();
      } else name += letter;
    }
    return name;
  })();

  return (
    <svg className="icon" fill={color}>
      <use xlinkHref={`sprite/icons.svg#${filename}`}></use>
    </svg>
  );
};

export default Icon;
