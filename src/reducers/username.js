import { CHANGE_USERNAME } from "../constants/actionTypes";

export default (username = "", action) => {
  switch (action.type) {
    case CHANGE_USERNAME:
      return action.payload.newUsername;
    default:
      return username;
  }
};
