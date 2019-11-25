import { UPDATE_SHAPE_SHADOW } from '../constants/actionTypes';
import { getShapeShadow } from '../availableShapes';

export default (state = null, action) => {
    switch (action.type) {
        case UPDATE_SHAPE_SHADOW:
            const { activeShape, filledCells } = action.payload;
            return getShapeShadow(activeShape, filledCells);
        default:
            return state;
    }
};