import { FINISH_GAME } from "../constants/actionTypes";

export default (lastResult = null, action) => {
  switch (action.type) {
    case FINISH_GAME:
      return action.payload.result;
    default:
      return lastResult;
  }
};
