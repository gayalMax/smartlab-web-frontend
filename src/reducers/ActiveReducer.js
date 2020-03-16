import { ReactReduxContext } from "react-redux";

const initialUser = {
  token: "",
  role: ""
};

export default (currentUser = initialUser, action) => {
  switch (action.type) {
    case "LOGINSUBMIT":
      return {
        ...currentUser,
        token: action.payload,
        role: action.payload
      };
    default:
      return currentUser;
  }
};
