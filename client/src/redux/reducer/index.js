import {
  changeMessageUltimateHelp,
  searchChatsHelp,
  searchFriendHelp,
} from "../../components/PageChats/utils";
import {
  CREATE_USER,
  LOGIN,
  LOGOUT,
  VERIFY_USER_TOKEN,
  GET_PROFILE_FRIEND,
  POST_USER,
  CLEAN_POST,
  GET_USERS_INFORMATION,
  GET_CHATS_ACTION,
  GET_CHAT_BY_USER,
  SEND_MESSAGE_BACK,
  ADD_CHAT_PREVENT_ACTION,
  SEARCH_USER,
  FRIENDS_BY_USER,
  SEND_FRIEND_REQUEST,
  CONFIRMED_FRIEND_REQUEST,
  SEARCH_CHATS,
  CHAT_TIME_REAL,
  CHANGE_PREVIEW_ULTIMATE_MESSAGE,
} from "../actions";

const initialState = {
  createUser: [],
  userLogin: null,
  userInformation: null,
  friendsByUser: [],
  userProfileFriend: {},
  postUser: {},
  usersInformationFriends: [],
  searchUser: [],
  chatUsers: [],
  chatUsersCopy: [],
  chatPrevent: [],
  chatByUser: [],
  chatTimeReal: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //User Information
    case CREATE_USER: {
      return {
        ...state,
        createUser: action.payload,
      };
    }
    case LOGIN: {
      return {
        ...state,
        userLogin: action.payload,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        userLogin: null,
      };
    }
    case VERIFY_USER_TOKEN: {
      return {
        ...state,
        userInformation: action.payload,
      };
    }

    //User Information

    case POST_USER: {
      return {
        ...state,
        postUser: action.payload,
      };
    }
    case CLEAN_POST: {
      return {
        ...state,
        postUser: {},
      };
    }
    //User Information
    //FIRENDS
    case FRIENDS_BY_USER: {
      return {
        ...state,
        friendsByUser: action.payload,
      };
    }
    case GET_PROFILE_FRIEND: {
      return {
        ...state,
        userProfileFriend: action.payload,
      };
    }
    case GET_USERS_INFORMATION: {
      return {
        ...state,
        usersInformationFriends: action.payload,
      };
    }
    case SEND_FRIEND_REQUEST: {
      return {
        ...state,
      };
    }
    case CONFIRMED_FRIEND_REQUEST: {
      return {
        ...state,
      };
    }
    //CHAT
    case GET_CHATS_ACTION: {
      return {
        ...state,
        chatUsers: action.payload,
        chatUsersCopy: action.payload,
      };
    }
    case ADD_CHAT_PREVENT_ACTION: {
      return {
        ...state,
        chatPrevent: [...state.chatPrevent, action.payload],
      };
    }
    case GET_CHAT_BY_USER: {
      return {
        ...state,
        chatByUser: action.payload,
      };
    }
    case SEND_MESSAGE_BACK: {
      return {
        ...state,
      };
    }
    case CHAT_TIME_REAL: {
      if (action.payload === "clear") return { ...state, chatTimeReal: [] };
      return {
        ...state,
        chatTimeReal: [...state.chatTimeReal, action.payload],
      };
    }
    case CHANGE_PREVIEW_ULTIMATE_MESSAGE: {
      return {
        ...state,
        chatUsers: changeMessageUltimateHelp(
          state.chatUsers,
          state.chatTimeReal
        ),
      };
    }

    //CHAT

    //SEARCH

    case SEARCH_USER: {
      return {
        ...state,
        searchUser: searchFriendHelp(
          action.payload,
          state.usersInformationFriends
        ),
      };
    }

    case SEARCH_CHATS: {
      return {
        ...state,
        chatUsers: searchChatsHelp(action.payload, state.chatUsersCopy),
      };
    }
    //SEARCH

    default:
      return state;
  }
};

export default rootReducer;
