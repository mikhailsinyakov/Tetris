import { CLEAR_LINE, START_GAME, MOVE_SHAPE } from "../constants/actionTypes";

const initialState = {
  score: 0,
  lines: 0,
  level: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MOVE_SHAPE:
      if (action.payload.direction === "down") {
        return {
          ...state,
          score: state.score + state.level / 10
        };
      } else return state;

    case CLEAR_LINE:
      const maxLevel = 9;
      const lines = state.lines + 1;
      const level =
        lines % 3 === 0 ? Math.min(state.level + 1, maxLevel) : state.level;
      return {
        score: state.score + state.level * 100,
        lines,
        level
      };
    case START_GAME:
      return initialState;
    default:
      return state;
  }
};
