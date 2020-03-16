import axios from "axios";

export const loginSubmit = value => {
  axios.post("", { value }).then(res => {
    return {
      type: "LOGINSUBMIT",
      payload: res.data
    };
  });
};
