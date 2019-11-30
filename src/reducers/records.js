import { FINISH_GAME } from '../constants/actionTypes';
import Records from '../Records';
const records = new Records();

export default (state = records.get(), action) => {
    switch (action.type) {
        case FINISH_GAME:
            const { result } = action.payload;
            records.add(result);
            return records.get();
        default:
            return state;
    }
};