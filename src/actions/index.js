import {
  START_GAME,
  FINISH_GAME,
  ROTATE_SHAPE,
  MOVE_SHAPE,
  CLEAR_LINE,
  REPLACE_SHAPE,
  UPDATE_SHAPE_SHADOW,
	CHANGE_DIALOG_NAME,
	CHANGE_USERNAME
} from '../constants/actionTypes';
import Shape from '../lib/Shape';

export const startGame = () => {
  return {
    type: START_GAME,
    payload: {
      activeShape: new Shape(),
      nextShape: new Shape()
    }
  };
};

export const finishGame = result => ({
  type: FINISH_GAME,
  payload: {
    result
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

export const changeUsername = username => {
	return {
		type: CHANGE_USERNAME,
		payload: {
			username
		}
	};
};