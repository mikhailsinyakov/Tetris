import {
  START_GAME,
  PAUSE_GAME,
  RESUME_GAME,
  FINISH_GAME,
  ROTATE_SHAPE,
  MOVE_SHAPE,
  INCREASE_SPEED,
  DECREASE_SPEED,
  CLEAR_LINE,
  REPLACE_SHAPE,
  UPDATE_SHAPE_SHADOW,
  CHANGE_DIALOG_NAME
} from '../constants/actionTypes';
import Shape from '../Shape';

export const startGame = () => {
  return {
    type: START_GAME,
    payload: {
      activeShape: new Shape(),
      nextShape: new Shape()
    }
  };
};

export const pauseGame = () => ({
  type: PAUSE_GAME
});

export const resumeGame = () => ({
  type: RESUME_GAME
});

export const finishGame = result => ({
  type: FINISH_GAME,
  payload: {
    result
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

export const changeDialogName = dialogName => {
  return {
    type: CHANGE_DIALOG_NAME,
    payload: {
      dialogName
    }
  };
};