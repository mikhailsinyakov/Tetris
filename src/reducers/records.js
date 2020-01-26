import { RECORDS_UPDATED } from '../constants/actionTypes';

export default (state = [], action) => {
    switch (action.type) {
        case RECORDS_UPDATED:
            return action.payload.records;
        default:
            return state;
    }
};