import axios from "axios";
export const SEND_MESSAGE_FRONT = "SEND_MESSAGE_FRONT";
export const CREATE_USER = "CREATE_USER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const VERIFY_USER_TOKEN = "VERIFY_USER_TOKEN";
export const FRIENDS_BY_USER = "FRIENDS_BY_USER";
export const GET_PROFILE_FRIEND = "GET_PROFILE_FRIEND";
export const SEND_FRIEND_REQUEST = "SEND_FRIEND_REQUEST";
export const CONFIRMED_FRIEND_REQUEST = "CONFIRMED_FRIEND_REQUEST";
export const POST_USER = "POST_USER";
export const CLEAN_POST = "CLEAN_POST";
export const GET_USERS_INFORMATION = "GET_USERS_INFORMATION";
export const GET_CHATS_ACTION = "GET_CHATS_ACTION";
export const ADD_CHAT_PREVENT_ACTION = "ADD_CHAT_PREVENT_ACTION";
export const GET_CHAT_BY_USER = "GET_CHAT_BY_USER";
export const SEND_MESSAGE_BACK = "SEND_MESSAGE_BACK";
export const SEARCH_USER = "SEARCH_USER";
export const SEARCH_CHATS = "SEARCH_CHATS_ACTION";

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
// Estado global que tiene la informacion del usuario loguiado
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

export const getFriendsByUser = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/users/friends/${id}`
      );
      return dispatch({ type: FRIENDS_BY_USER, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
//USERS INFORMATION

//FRIENDS
export const getProfileFriendAction = (idUser) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/users/id/${idUser}`
      );
      return dispatch({ type: GET_PROFILE_FRIEND, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getInformationUsersAction = () => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`http://localhost:3000/api/users`);
      return dispatch({ type: GET_USERS_INFORMATION, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const sendRequestFriendAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/friends/add",
        data
      );
      dispatch({ type: SEND_FRIEND_REQUEST, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const confirmedRequestFriendAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/friends/res",
        data
      );
      dispatch({ type: CONFIRMED_FRIEND_REQUEST, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
//FRIENDS

//POST USER
export const postUser = (post) => {
  return async (dispatch) => {
    try {
      const result = await axios.post("http://localhost:3000/api/posts", post);
      dispatch({ type: POST_USER, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

//CLEAN POST
export const cleanPostState = () => {
  return { type: CLEAN_POST };
};
//CHATS
export const getChatsBackAction = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/users/chat/${id}`
      );
      console.log(result.data);
      return dispatch({ type: GET_CHATS_ACTION, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const addChatBackAction = (payload) => {
  return { type: ADD_CHAT_PREVENT_ACTION, payload };
};
export const getMessageByUserBackAction = (data) => {
  if (data === "clear") return { type: GET_CHAT_BY_USER, payload: [] };
  return async (dispatch) => {
    try {
      const result = await axios.post(
        `http://localhost:3000/api/messages/all`,
        data
      );
      return dispatch({ type: GET_CHAT_BY_USER, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendMessageBackAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        `http://localhost:3000/api/messages`,
        data
      );
      return dispatch({ type: SEND_MESSAGE_BACK, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const sendMessagesFrontAction = (payload) => {
  return {
    type: SEND_MESSAGE_FRONT,
    payload,
  };
};
//CHATS
//SEARCH
export const searchUserAction = (payload) => {
  return { type: SEARCH_USER, payload };
};
export const searchChatsAction = (payload) => {
  return { type: SEARCH_CHATS, payload };
};
//SEARCH
