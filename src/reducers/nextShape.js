import { START_GAME, REPLACE_SHAPE } from '../constants/actionTypes';

export default (state = null, action) => {
  switch (action.type) {
    case START_GAME:
    case REPLACE_SHAPE:
      return action.payload.nextShape;
    default:
      return state;
  }
};
