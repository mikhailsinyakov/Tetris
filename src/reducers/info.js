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
      const level = Math.floor((state.lines + 1) / 5) + 1;
      return {
        score: state.score + state.level * 100,
        lines: state.lines + 1,
        level: level > maxLevel ? maxLevel : level
      };
    case START_GAME:
      return initialState;
    default:
      return state;
  }
};
