import { UPDATE_SHAPE_SHADOW } from "../constants/actionTypes";

export default (shadow = null, action) => {
  switch (action.type) {
    case UPDATE_SHAPE_SHADOW:
      return action.payload.newShadow;
    default:
      return shadow;
  }
};
