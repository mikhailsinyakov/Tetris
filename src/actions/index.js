import {
  START_GAME,
  PAUSE_GAME,
  RESUME_GAME,
  FINISH_GAME,
  MAKE_MOVE,
  ROTATE_SHAPE,
  MOVE_SHAPE,
  INCREASE_SPEED,
  DECREASE_SPEED,
  CLEAR_LINE,
  REPLACE_SHAPE,
  UPDATE_SHAPE_SHADOW
} from '../constants/actionTypes';
import Shape from '../Shape';

export const startGame = cellSide => {
  return {
    type: START_GAME,
    payload: {
      activeShape: new Shape(),
      nextShape: new Shape(),
      cellSide
    }
  };
};

export const pauseGame = () => ({
  type: PAUSE_GAME
});

export const resumeGame = () => ({
  type: RESUME_GAME
});

export const finishGame = () => ({
  type: FINISH_GAME
});

export const makeMove = filledCells => ({
  type: MAKE_MOVE,
  payload: {
    filledCells
  }
});

export const rotateShape = filledCells => ({
  type: ROTATE_SHAPE,
  payload: {
    filledCells
  }
});

export const moveShape = (direction, filledCells) => ({
  type: MOVE_SHAPE,
  payload: {
    direction,
    filledCells
  }
});

export const increaseSpeed = () => ({
  type: INCREASE_SPEED
});

export const decreaseSpeed = () => ({
  type: DECREASE_SPEED
});

export const clearLine = number => ({
  type: CLEAR_LINE,
  payload: {
    number
  }
});

export const replaceShape = (activeShape, nextShape) => {
  return {
    type: REPLACE_SHAPE,
    payload: {
      prevShape: activeShape,
      activeShape: nextShape,
      nextShape: new Shape()
    }
  };
};

export const updateShapeShadow = (activeShape, filledCells) => {
  return {
    type: UPDATE_SHAPE_SHADOW,
    payload: {
      activeShape,
      filledCells
    }
  };
};