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
  GET_POSTS,
  GET_ALL_POSTS,
  SEND_FRIEND_REQUEST,
  CONFIRMED_FRIEND_REQUEST,
  SEARCH_CHATS,
  CLEAR,
  DELETE_POST,
  CLEAR_DELETE_POST,
  CHAT_TIME_REAL,
  CHANGE_PREVIEW_ULTIMATE_MESSAGE,
  UPDATE_POST,
  CLEAR_UPDATE,
  GET_CHATS_GROUP,
  MESSAGES_IS_CHAT,
  CLEAR_POSTS,
  GET_MESSAGE_BY_USER_GROUP,
  SEND_MESSAGE_BY_GROUP,
  EDIT_PROFILE,
  GET_COMMENTS,
  GET_POST_BY_ID,
  INVITATION_SEND_GROUP,
  RESPONSE_GROUP_INVITATION,
  LIKE_DISLIKE_POST,
  UPDATE_POST_REFRESH,
  SET_LOADING,
  GET_RECCOMENDS_MATCH,
  REFRESH_UPDATE_PROFILE,
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
  chatUsers: null,
  chatUsersCopy: [],
  chatPrevent: [],
  chatByUser: null,
  loading: false,
  isChat: true,
  chatTimeReal: [],
  userPostsProfile: null,
  allPosts: [],
  updatePost: [],
  matchsRecommended: null,
  updatePostRefresh: false,
  refresh_update_profile: false,
  comments: null,
  postById: {},
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //User Information
    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

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
    case GET_MESSAGE_BY_USER_GROUP: {
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
    case SEND_MESSAGE_BY_GROUP: {
      return {
        ...state,
      };
    }
    case GET_CHATS_GROUP: {
      return {
        ...state,
        chatUsers: action.payload,
      };
    }
    case INVITATION_SEND_GROUP: {
      return {
        ...state,
      };
    }
    case RESPONSE_GROUP_INVITATION: {
      return {
        ...state,
      };
    }
    case MESSAGES_IS_CHAT: {
      return {
        ...state,
        isChat: !state.isChat,
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

    case GET_POSTS: {
      return {
        ...state,
        userPostsProfile: action.payload.reverse(),
      };
    }
    case GET_ALL_POSTS: {
      return {
        ...state,
        allPosts: action.payload.reverse(),
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
    case CLEAR: {
      return {
        ...state,
        createUser: [],
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        deletePost: action.payload[0],
        userPostsProfile: state.userPostsProfile.filter(
          (e) => e._id != action.payload[1]
        ),
        allPosts: state.allPosts.filter(
          (e) => e.post._id !== action.payload[1]
        ),
      };
    }
    case CLEAR_DELETE_POST: {
      return {
        ...state,
        deletePost: null,
      };
    }
    //Update Post
    case UPDATE_POST: {
      return {
        ...state,
      };
    }
    case CLEAR_UPDATE: {
      return {
        ...state,
        updatePost: null,
      };
    }
    case CLEAR_POSTS: {
      return {
        ...state,
        userPostsProfile: null,
      };
    }
    case UPDATE_POST_REFRESH: {
      return {
        ...state,
        updatePostRefresh: !state.updatePostRefresh,
      };
    }

    case GET_COMMENTS: {
      return {
        ...state,
        comments: action.payload,
      };
    }
    case GET_POST_BY_ID: {
      return {
        ...state,
        postById: action.payload,
      };
    }
    case GET_RECCOMENDS_MATCH: {
      return {
        ...state,
        matchsRecommended: action.payload,
      };
    }
    case LIKE_DISLIKE_POST: {
      return {
        ...state,
      };
    }
    case REFRESH_UPDATE_PROFILE: {
      return {
        ...state,
        refresh_update_profile: !state.refresh_update_profile,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
