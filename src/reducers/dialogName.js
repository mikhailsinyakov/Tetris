import { CHANGE_DIALOG_NAME } from '../constants/actionTypes';

export default (name = 'menu', action) => {
    switch (action.type) {
        case CHANGE_DIALOG_NAME:
            return action.payload.dialogName;
        default: 
            return name;
    }
};