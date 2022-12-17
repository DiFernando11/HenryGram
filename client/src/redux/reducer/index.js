import { searchFriendHelp } from "../../components/helpers/searchFriends";
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

} from "../actions";

const initialState = {
  createUser: [],
  userLogin: null,
  userInformation: null,
  userProfileFriend: {},
  postUser: {},
  usersInformationFriends: [],
  // copyUsersInformationFriends: [],
  searchUser: [],
  chatUsers: [],
  chatPrevent: [],
  chatByUser: [],
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
    //FRIENDS
    case GET_PROFILE_FRIEND: {
      return {
        ...state,
        userProfileFriend: action.payload,
      };
    }
    case POST_USER: {
      return{ 
        ...state,
        postUser: action.payload
      }
    }
    case CLEAN_POST: {
      return{
        ...state,
        postUser: {}
      }
    }
    //User Information
    //SEARCH
    case GET_USERS_INFORMATION: {
      return {
        ...state,
        usersInformationFriends: action.payload,
      };
    }
    case SEARCH_USER: {
      return {
        ...state,
        searchUser: searchFriendHelp(action.payload, state.usersInformationFriends),
      };
    }
    //SEARCH
    //FIRENDS
    //CHAT
    case GET_CHATS_ACTION: {
      return {
        ...state,
        chatUsers: action.payload,
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
    //CHAT
    default:
      return state;
  }
};

export default rootReducer;
