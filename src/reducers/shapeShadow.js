import { UPDATE_SHAPE_SHADOW } from "../constants/actionTypes";

export default (shadow = null, action) => {
  switch (action.type) {
    case UPDATE_SHAPE_SHADOW:
      const { activeShape, filledCells } = action.payload;
      return activeShape.getShadow(filledCells);
    default:
      return shadow;
  }
};
