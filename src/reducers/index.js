import { combineReducers } from 'redux';
import filledCells from './filledCells';
import activeShape from './activeShape';
import nextShape from './nextShape';
import shapeShadow from './shapeShadow';
import isPlaying from './isPlaying';
import info from './info';
import isOver from './isOver';
import speedUp from './speedUp';
import dialogName from './dialogName';
import records from './records';
import lastResult from './lastResult';

export default combineReducers({
  filledCells,
  activeShape,
  nextShape,
  shapeShadow,
  isPlaying,
  info,
  isOver,
  speedUp,
  dialogName,
  records,
  lastResult
});
