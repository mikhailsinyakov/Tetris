import { CHANGE_USERNAME } from "../constants/actionTypes";

export default (username = localStorage.getItem("username"), action) => {
  switch (action.type) {
    case CHANGE_USERNAME:
      const { username: newUsername } = action.payload;
      if (!newUsername) localStorage.removeItem("username");
      else localStorage.setItem("username", newUsername);
      return newUsername;
    default:
      return username;
  }
};
