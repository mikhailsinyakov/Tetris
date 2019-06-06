import {
  START_GAME,
  PAUSE_GAME,
  FINISH_GAME,
  RESUME_GAME
} from '../constants/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case START_GAME:
    case RESUME_GAME:
      return true;
    case PAUSE_GAME:
    case FINISH_GAME:
      return false;
    default:
      return state;
  }
};
