import { START_GAME, RECORDS_UPDATED } from "../constants/actionTypes";

export default (state = true, action) => {
  switch (action.type) {
    case START_GAME:
      return false;
    case RECORDS_UPDATED:
      return true;
    default:
      return state;
  }
};
