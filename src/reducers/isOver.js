import { START_GAME, FINISH_GAME } from '../constants/actionTypes';

export default (state = true, action) => {
  switch (action.type) {
    case START_GAME:
      return false;
    case FINISH_GAME:
      return true;
    default:
      return state;
  }
};
