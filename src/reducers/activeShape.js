import {
  START_GAME,
  ROTATE_SHAPE,
  MOVE_SHAPE,
  REPLACE_SHAPE
} from '../constants/actionTypes';

export default (shape = null, action) => {
  switch (action.type) {
    case START_GAME:
    case REPLACE_SHAPE: 
      return action.payload.activeShape;
    case ROTATE_SHAPE:
      return shape.tryToRotate(action.payload.filledCells);
    case MOVE_SHAPE: {
      const { direction, filledCells } = action.payload;
      return shape.tryToMove(direction, filledCells);
    }
    default:
      return shape;
  }
};
