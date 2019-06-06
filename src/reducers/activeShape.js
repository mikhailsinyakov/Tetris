import {
  START_GAME,
  MAKE_MOVE,
  ROTATE_SHAPE,
  MOVE_SHAPE,
  REPLACE_SHAPE
} from '../constants/actionTypes';
import config from '../config';
import { getShape, rotateShape, calcCellsDiff } from '../availableShapes';

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
      const shift = {
        x: config.fieldSize.width / 2 - Math.floor(shapeSize.width / 2),
        y: -shapeSize.height
      };
      return {
        ...activeShape,
        cells: cells.map(cell => ({
          x: cell.x + shift.x,
          y: cell.y + shift.y
        }))
      };
    }
    case MAKE_MOVE: {
      return {
        ...state,
        cells: state.cells.map(cell => ({
          x: cell.x,
          y: cell.y + 1
        }))
      };
    }
    case ROTATE_SHAPE: {
      const { type, rotation, cells } = state;
      const { cells: prevCells } = getShape(type, rotation);
      const {
        rotation: newRotation,
        cells: changedCells
      } = rotateShape(type, rotation);
      const diffs = calcCellsDiff(prevCells, changedCells);
      console.log(diffs)
      return {
        ...state,
        rotation: newRotation,
        cells: cells.map((cell, i) => ({
          x: cell.x + diffs[i].x,
          y: cell.y + diffs[i].y
        }))
      };
    }
    case MOVE_SHAPE:
      const { direction } = action.payload;
      const shift = direction === 'left' ? -1 : 1;
      return {
        ...state,
        cells: state.cells.map(cell => ({
          ...cell,
          x: cell.x + shift
        }))
      };
    default:
      return state;
  }
};
