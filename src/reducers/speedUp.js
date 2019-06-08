import {
  INCREASE_SPEED,
  DECREASE_SPEED
} from '../constants/actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case DECREASE_SPEED:
      return false;
    case INCREASE_SPEED:
      return true;
    default:
      return state;
  }
};
