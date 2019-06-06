import { MAKE_MOVE, CLEAR_LINES } from '../constants/actionTypes';

const initialState = {
  score: 0,
  lines: 0,
  level: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MAKE_MOVE:
      return {
        ...state,
        score: state.score + state.level
      };
    case CLEAR_LINES:
      const linesCount = action.payload.lines.length;
      return {
        score: state.score + state.level * 100 * linesCount,
        lines: state.lines + linesCount,
        level: Math.floor((state.lines + linesCount) / 10) + 1
      };
    default:
      return state;
  }
};
