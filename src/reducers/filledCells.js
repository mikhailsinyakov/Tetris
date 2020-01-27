import {
  START_GAME,
  CLEAR_LINE,
  REPLACE_SHAPE
} from "../constants/actionTypes";

export default (state = [], action) => {
  switch (action.type) {
    case START_GAME:
      return [];
    case CLEAR_LINE:
      const { number } = action.payload;
      return state
        .filter(({ y }) => y !== number)
        .map(cell => ({
          ...cell,
          y: cell.y + (cell.y < number ? 1 : 0)
        }));
    case REPLACE_SHAPE:
      const { prevShape } = action.payload;
      const newFilledCells = prevShape.cells.map(cell => ({
        x: cell.x,
        y: cell.y,
        color: prevShape.color
      }));

      return [...state, ...newFilledCells];
    default:
      return state;
  }
};
