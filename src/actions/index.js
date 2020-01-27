import {
  START_GAME,
  FINISH_GAME,
  ROTATE_SHAPE,
  MOVE_SHAPE,
  CLEAR_LINE,
  REPLACE_SHAPE,
  UPDATE_SHAPE_SHADOW,
  CHANGE_DIALOG_NAME,
  CHANGE_USERNAME,
  RECORDS_UPDATED
} from "../constants/actionTypes";
import Shape from "../lib/Shape";

export const startGame = () => ({
  type: START_GAME,
  payload: {
    activeShape: new Shape(),
    nextShape: new Shape()
  }
});

export const finishGame = (result, username) => ({
  type: FINISH_GAME,
  payload: {
    result,
    username
  }
});

export const rotateShape = (filledCells, clockwise) => ({
  type: ROTATE_SHAPE,
  payload: {
    filledCells,
    clockwise
  }
});

export const moveShape = (direction, filledCells) => ({
  type: MOVE_SHAPE,
  payload: {
    direction,
    filledCells
  }
});

export const clearLine = number => ({
  type: CLEAR_LINE,
  payload: {
    number
  }
});

export const replaceShape = (activeShape, nextShape) => ({
  type: REPLACE_SHAPE,
  payload: {
    prevShape: activeShape,
    activeShape: nextShape,
    nextShape: new Shape()
  }
});

export const updateShapeShadow = (activeShape, filledCells) => ({
  type: UPDATE_SHAPE_SHADOW,
  payload: {
    newShadow: activeShape.getShadow(filledCells)
  }
});

export const changeDialogName = dialogName => ({
  type: CHANGE_DIALOG_NAME,
  payload: {
    dialogName
  }
});

export const changeUsername = newUsername => ({
  type: CHANGE_USERNAME,
  payload: {
    newUsername
  }
});

export const recordsUpdated = records => ({
  type: RECORDS_UPDATED,
  payload: {
    records
  }
});
