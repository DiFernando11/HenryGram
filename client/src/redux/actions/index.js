import axios from "axios";
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
export const GET_CHATS_GROUP = "GET_CHATS_GROUP";
export const GET_MESSAGE_BY_USER_GROUP = "GET_MESSAGE_BY_USER_GROUP";
export const SEND_MESSAGE_BY_GROUP = "SEND_MESSAGE_BY_GROUP";
export const INVITATION_SEND_GROUP = "INVITATION_SEND_GROUP";
export const RESPONSE_GROUP_INVITATION = "RESPONSE_GROUP_INVITATION";
export const MESSAGES_IS_CHAT = "MESSAGES_IS_CHAT";
export const CHAT_TIME_REAL = "CHAT_TIME_REAL";
export const CHANGE_PREVIEW_ULTIMATE_MESSAGE =
  "CHANGE_PREVIEW_ULTIMATE_MESSAGE";
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const CLEAR = "CLEAR";
export const DELETE_POST = "DELETE_POST";
export const CLEAR_DELETE_POST = "CLEAR_DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const CLEAR_UPDATE = "CLEAR_UPDATE";
export const SEARCH_USER = "SEARCH_USER";
export const SEARCH_CHATS = "SEARCH_CHATS_ACTION";
export const SEARCH_CHATS_GROUPS = "SEARCH_CHATS_GROUPS";
export const CLEAR_POSTS = "CLEAR_POSTS";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const LIKE_DISLIKE_POST = "LIKE_DISLIKE_POST";
export const GET_FRIENDS_AVATAR_AND_NAME = "GET_FRIENDS_AVATAR_AND_NAME";
export const UPDATE_POST_REFRESH = "UPDATE_POST_REFRESH";
export const POST_COMMENTS = "POST_COMMENTS";
export const GET_COMMENTS = "GET_COMMENTS";
export const GET_RECCOMENDS_MATCH = "GET_RECCOMENDS_POST";
export const GET_POST_BY_ID = "GET_POST_BY_ID";
export const REFRESH_UPDATE_PROFILE = "REFRESH_UPDATE_PROFILE";
export const SET_LOADING = "SET_LOADING";
//USERS INFORMATION
//REGISTER

const URL = import.meta.env.VITE_URL_RAILWAY;

export const createUser = (user) => {
  return async function (dispatch) {
    try {
      dispatch({ type: SET_LOADING, payload: true });
      const result = await axios.post(
        `${URL || "http://localhost:3000"}/api/users`,
        user
      );
      dispatch({ type: SET_LOADING, payload: false });
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
        `${URL || "http://localhost:3000"}/api/users/login`,
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
        `${URL || "http://localhost:3000"}/api/users/token?token=${token}`
      );
      return dispatch({ type: VERIFY_USER_TOKEN, payload: result.data });
    } catch (error) {
      return dispatch({ type: VERIFY_USER_TOKEN, payload: "error" });
    }
  };
};

export const getFriendsByUser = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${URL || "http://localhost:3000"}/api/users/friends/${id}`
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
  if (idUser === "clear") return { type: GET_PROFILE_FRIEND, payload: {} };
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${URL || "http://localhost:3000"}/api/users/id/${idUser}`
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
      const result = await axios.get(
        `${URL || "http://localhost:3000"}/api/users`
      );
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
        `${URL || "http://localhost:3000"}/api/friends/add`,
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
        `${URL || "http://localhost:3000"}/api/friends/res`,
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

export const getFriendsAvatarAndName = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${URL || "http://localhost:3000"}/api/users/nameAndAvatar/${id}`
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };
};

//POST USER
export const postUser = (post) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        `${URL || "http://localhost:3000"}/api/posts`,
        post
      );
      dispatch({ type: POST_USER, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const updatePostRefresh = () => {
  return { type: UPDATE_POST_REFRESH };
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
        `${URL || "http://localhost:3000"}/api/users/messages/${id}`
      );
      return dispatch({ type: GET_CHATS_ACTION, payload: result.data });
    } catch (error) {
      console.error(error);
    }
  };
};
export const addChatBackAction = (payload) => {
  return { type: ADD_CHAT_PREVENT_ACTION, payload };
};
export const getMessageByUserBackAction = (data) => {
  if (data === "clear") return { type: GET_CHAT_BY_USER, payload: null };
  return async (dispatch) => {
    try {
      const result = await axios.post(
        `${URL || "http://localhost:3000"}/api/messages/all`,
        data
      );
      return dispatch({ type: GET_CHAT_BY_USER, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendMessageBackAction = (from, to, message, image) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        `${URL || "http://localhost:3000"}/api/messages`,
        {
          from,
          to,
          message,
          image,
        }
      );
      return dispatch({ type: SEND_MESSAGE_BACK, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getChatsGroupAction = (id) => {
  if (id === "clear") return { type: GET_CHATS_GROUP, payload: null };
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${URL || "http://localhost:3000"}/api/users/groups/${id}`
      );
      return dispatch({ type: GET_CHATS_GROUP, payload: result.data });
    } catch (error) {
      console.error("error en la funcion getChatsBackAction");
    }
  };
};
export const getChatByUserGroupAction = (id, limit) => {
  // ${URL || "http://localhost:3000"}/api/groups?id=63a23d1113cae7910c834510&limit=1
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${URL || "http://localhost:3000"}/api/groups?id=${id}&limit=${limit}`
      );
      return dispatch({
        type: GET_MESSAGE_BY_USER_GROUP,
        payload: result.data,
      });
    } catch (error) {
      console.error("error en la funcion getChatsBackAction");
    }
  };
};
export const sendMessageByGroup = (userId, groupId, content, image) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        `${URL || "http://localhost:3000"}/api/groups`,
        {
          userId,
          groupId,
          content,
          image,
        }
      );
      return dispatch({ type: SEND_MESSAGE_BY_GROUP, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const invitationSendGroupAction = (payload) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        `${URL || "http://localhost:3000"}/api/groups/req`,
        payload
      );
      console.log(result.data, "data");
      return dispatch({ type: INVITATION_SEND_GROUP, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const responseInvitationGroupAction = (payload) => {
  return async (dispatch) => {
    try {
      await axios.post(
        `${URL || "http://localhost:3000"}/api/groups/res`,
        payload
      );
      return dispatch({
        type: RESPONSE_GROUP_INVITATION,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const messagesIsChat = () => {
  return { type: MESSAGES_IS_CHAT };
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
export const searchChatsGroupAction = (payload) => {
  return { type: SEARCH_CHATS_GROUPS, payload };
};
//SEARCH

//GET ALL POSTS

export const getPostAllUsers = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${URL || "http://localhost:3000"}/api/posts/recomended/${id}`
      );
      dispatch({ type: GET_ALL_POSTS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostUSer = (id, limit) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${URL || "http://localhost:3000"}/api/posts/user?id=${id}&limit=1`
      );
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
  } else if (data === "update") {
    return { type: CLEAR_UPDATE };
  } else if (data === "posts") {
    return { type: CLEAR_POSTS };
  }
};
//DELETE POST
export const deletePostFront = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.delete(
        `${URL || "http://localhost:3000"}/api/posts/${id}`
      );
      dispatch({ type: DELETE_POST, payload: [result.data, id] });
    } catch (error) {
      console.log(error);
    }
  };
};

//UPDATE POST
export const updatePostFront = (body) => {
  return async (dispatch) => {
    try {
      const result = await axios.put(
        `${URL || "http://localhost:3000"}/api/posts/${body.id}`,
        body
      );
      console.log("Esta es la respuesta del back:", result.data);
      dispatch({ type: UPDATE_POST, payload: [result.data, body.id] });
    } catch (error) {
      console.log(error);
    }
  };
};

//EDIT PROFILE

export const editProfileAction = (data) => {
  return async (dispatch) => {
    try {
      const result = await axios.put(
        `${URL || "http://localhost:3000"}/api/users/${data.id}`,
        data
      );
      dispatch({ type: EDIT_PROFILE, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

//POST COMMENTS
export const postComment = (body) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        `${URL || "http://localhost:3000"}/api/posts/comment`,
        body
      );
      dispatch({ type: POST_COMMENTS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

//GET COMMENTS OF A POST
export const getComments = (id) => {
  if (id === "clear") return { type: GET_COMMENTS, payload: null };
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${URL || "http://localhost:3000"}/api/posts/comment?id=${id}&limit=1`
      );
      dispatch({ type: GET_COMMENTS, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getPostById = (id) => {
  if (id === "clear") return { type: GET_POST_BY_ID, payload: {} };
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${URL || "http://localhost:3000"}/api/posts/id/${id}`
      );
      dispatch({ type: GET_POST_BY_ID, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const getRecomendedMatches = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${URL || "http://localhost:3000"}/api/groups/recommended/${id}`
      );
      dispatch({ type: GET_RECCOMENDS_MATCH, payload: result.data });
    } catch (error) {
      console.log(error);
    }
  };
};

//LIKES
export const likeDislikePostAction = (data) => {
  return async (dispatch) => {
    try {
      await axios.post(
        `${URL || "http://localhost:3000"}/api/posts/like?postId=${
          data.postId
        }&userId=${data.userId}`,
        data
      );
      dispatch({ type: LIKE_DISLIKE_POST });
    } catch (error) {
      console.log(error);
    }
  };
};

export const refreshUpdateProfile = () => {
  return { type: REFRESH_UPDATE_PROFILE };
};
