import axios from "axios";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/auth/loginassureurs", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    window.location.reload();
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};