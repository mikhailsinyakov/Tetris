import {
  START_GAME,
  CLEAR_LINES,
  REPLACE_SHAPE
} from '../constants/actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case START_GAME:
      return [];
    case CLEAR_LINES:
      const { lines } = action.payload;
      return state.filter(({y}) => !lines.includes(y));
    case REPLACE_SHAPE:
      const { prevShape } = action.payload;
      const newFilledCells = prevShape.cells.map(cell => ({
        x: cell.x,
        y: cell.y,
        color: prevShape.color
      }));

      return [
        ...state,
        ...newFilledCells
      ];
    default:
      return state;
  }
};
