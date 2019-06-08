import {
  START_GAME,
  MAKE_MOVE,
  ROTATE_SHAPE,
  MOVE_SHAPE,
  REPLACE_SHAPE
} from '../constants/actionTypes';
import config from '../config';
import { getShapeAfterRotating } from '../availableShapes';

export default (state = null, action) => {
  switch (action.type) {
    case START_GAME:
    case REPLACE_SHAPE: {
      const { activeShape } = action.payload;
      const { cells } = activeShape;
      const shapeSize = cells.reduce((acc, cell) => ({
          width: cell.x > acc.width ? cell.x : acc.width,
          height: cell.y > acc.height ? cell.y : acc.height
        }),
        {width: 0, height: 0});
      const shiftX = Math.floor(config.fieldSize.width / 2) -
                    Math.floor(shapeSize.width / 2);
      const shiftY = -shapeSize.height;
      return {
        ...activeShape,
        cells: cells.map(cell => ({
          x: cell.x + shiftX,
          y: cell.y + shiftY
        }))
      };
    }
    case MAKE_MOVE:
      return {
        ...state,
        cells: state.cells.map(cell => ({
          x: cell.x,
          y: cell.y + 1
        }))
      };
    case ROTATE_SHAPE:
      return getShapeAfterRotating(state);
    case MOVE_SHAPE: {
      const { direction } = action.payload;
      const shift = direction === 'left' ? -1 : 1;
      return {
        ...state,
        cells: state.cells.map(cell => ({
          ...cell,
          x: cell.x + shift
        }))
      };
    }
    default:
      return state;
  }
};
