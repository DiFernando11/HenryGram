import axios from "axios";
import { useState } from "react";
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
export const CHAT_TIME_REAL = "CHAT_TIME_REAL";
export const CHANGE_PREVIEW_ULTIMATE_MESSAGE =
  "CHANGE_PREVIEW_ULTIMATE_MESSAGE";
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const CLEAR = "CLEAR";
export const DELETE_POST = "DELETE_POST";
export const CLEAR_DELETE_POST = "CLEAR_DELETE_POST";
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
      console.log(error);
      return dispatch({
        type: LOGIN,
        payload: error.response.data.message,
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
export const searchUserAction = (payload) => {
  return { type: SEARCH_USER, payload };
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
        `http://localhost:3000/api/users/messages/${id}`
      );
      return dispatch({ type: GET_CHATS_ACTION, payload: result.data });
    } catch (error) {
      console.error("error en la funcion getChatsBackAction");
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

export const chatTimeReal = (payload) => {
  return { type: CHAT_TIME_REAL, payload };
};
export const changeUltimateMessageTimeRealAction = () => {
  return { type: CHANGE_PREVIEW_ULTIMATE_MESSAGE };
};
//CHATS

export const searchChatsAction = (payload) => {
  return { type: SEARCH_CHATS, payload };
};
//SEARCH

//GET ALL POSTS
export const getPostAllUsers = () => {
  return async (dispatch) => {
    try {
      const result = await axios.get("http://localhost:3000/api/posts");
      dispatch({ type: GET_ALL_POSTS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostUSer = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`http://localhost:3000/api/posts/${id}`);
      dispatch({ type: GET_POSTS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
//CLEAR STATE OF CREATE USER
export const clearState = (data) => {
  if (data === "register") {
    return { type: CLEAR };
  } else if (data === "delete") {
    return { type: CLEAR_DELETE_POST };
  }
};
//DELETE POST
export const deletePostFront = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.delete(
        `http://localhost:3000/api/posts/${id}`
      );
      dispatch({ type: DELETE_POST, payload: [result.data, id] });
    } catch (error) {
      console.log(error);
    }
  };
};
