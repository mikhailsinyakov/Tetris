import { combineReducers } from 'redux';
import filledCells from './filledCells';
import activeShape from './activeShape';
import nextShape from './nextShape';
import isPlaying from './isPlaying';
import info from './info';
import cellSide from './cellSide';

export default combineReducers({
  filledCells,
  activeShape,
  nextShape,
  isPlaying,
  info,
  cellSide
});
