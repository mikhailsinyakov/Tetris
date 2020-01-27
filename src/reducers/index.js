import { combineReducers } from "redux";
import filledCells from "./filledCells";
import activeShape from "./activeShape";
import nextShape from "./nextShape";
import shapeShadow from "./shapeShadow";
import info from "./info";
import isOver from "./isOver";
import dialogName from "./dialogName";
import records from "./records";
import lastResult from "./lastResult";
import username from "./username";

export default combineReducers({
  filledCells,
  activeShape,
  nextShape,
  shapeShadow,
  info,
  isOver,
  dialogName,
  records,
  lastResult,
  username
});
