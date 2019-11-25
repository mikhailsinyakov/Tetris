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
import { getShape } from '../availableShapes';

export const startGame = cellSide => {
  const { type, rotation } = getShape(); // Next shape
  return {
    type: START_GAME,
    payload: {
      activeShape: getShape(),
      nextShape: { type, rotation },
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

export const makeMove = () => ({
  type: MAKE_MOVE
});

export const rotateShape = () => ({
  type: ROTATE_SHAPE
});

export const moveShape = direction => ({
  type: MOVE_SHAPE,
  payload: {
    direction
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
  const { type, rotation } = nextShape;
  const newNextShape = getShape();

  return {
    type: REPLACE_SHAPE,
    payload: {
      prevShape: activeShape,
      activeShape: getShape(type, rotation),
      nextShape: {
        type: newNextShape.type,
        rotation: newNextShape.rotation
      }
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