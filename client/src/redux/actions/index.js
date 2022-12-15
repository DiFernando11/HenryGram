import axios from "axios";
import { useAuth } from "../../components/auth";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const CREATE_USER = "CREATE_USER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const VERIFY_USER_TOKEN = "VERIFY_USER_TOKEN";

////CHATS
export const sendMessagesAction = (id, payload) => {
  return {
    type: SEND_MESSAGE,
    payload,
    id,
  };
};
//USERS INFORMATION
//REGISTER
export const createUser = (user) => {
  return async function (dispatch) {
    try {
      const result = await axios.post("http://localhost:3000/api/users", user);
      dispatch({ type: CREATE_USER, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
//LOGIN
export const loginAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/users/login",
        data
      );
      console.log(result.data);
      return dispatch({ type: LOGIN, payload: result.data });
    } catch (error) {
      return dispatch({
        type: LOGIN,
        payload: "E-mail or password are not correct",
      });
    }
  };
};
//LOGOUT
export const logoutAction = () => {
  return { type: LOGOUT };
};
// USER INFORMATION / VERIFIY USER
export const verifyUserAction = (token) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/users/token?token=${token}`
      );
      return dispatch({ type: VERIFY_USER_TOKEN, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
//USERS INFORMATION
