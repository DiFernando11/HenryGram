import { sendMessage } from "../../components/PageChats/utils";
import {
  SEND_MESSAGE,
  CREATE_USER,
  LOGIN,
  LOGOUT,
  VERIFY_USER_TOKEN,
} from "../actions";

const initialState = {
  messageChats: [
    {
      id: 1,
      idUser: 1,
      image:
        "https://gamer-commerce.vercel.app/static/media/FacundoMartinez.d850a2c1.jpeg",
      name: "Facundo Martinez",
      messages: [
        {
          id: 1,
          idUser: 1,
          message: "Hi guys, have your completed your design",
        },
        { id: 2, idUser: 1, message: "Hello" },
        { id: 3, idUser: 1, message: "My name is Facu" },
        { id: 4, idUser: 2, message: "My name is Diego" },
      ],
    },
    {
      id: 2,
      idUser: 3,
      image:
        "https://gamer-commerce.vercel.app/static/media/AndresOlarte.0b566e29.jpeg",
      name: "Andres Aldao",
      messages: [
        {
          id: 1,
          idUser: 3,
          message: "Hi guys, have your completed your design",
        },
        { id: 2, idUser: 3, message: "Hello" },
        { id: 3, idUser: 2, message: "Hello" },
        { id: 4, idUser: 3, message: "My name is Andres" },
      ],
    },
    {
      id: 3,
      idUser: 4,
      image:
        "https://gamer-commerce.vercel.app/static/media/LuisLazarte.1a5c228c.jpeg",
      name: "Luis Lazarte",
      messages: [
        {
          id: 1,
          idUser: 4,
          message: "Hi guys, have your completed your design",
        },
        { id: 2, idUser: 4, message: "Hello" },
        { id: 3, idUser: 4, message: "My name is Luis Lazarte" },
      ],
    },
    {
      id: 4,
      idUser: 5,
      image:
        "https://gamer-commerce.vercel.app/static/media/RogerPf.d7086f5b.jpeg",
      name: "Roger Perez",
      messages: [
        {
          id: 1,
          idUser: 5,
          message: "Hi guys, have your completed your design",
        },
        { id: 2, idUser: 5, message: "Hello" },
        { id: 3, idUser: 5, message: "my name is Roger Perez" },
        { id: 4, idUser: 2, message: "Hello roger" },
      ],
    },
    {
      id: 5,
      idUser: 6,
      image:
        "https://gamer-commerce.vercel.app/static/media/EmmanuelRomo.b21b242f.jpeg",
      name: "Nacho",
      messages: [
        {
          id: 1,
          idUser: 6,
          message: "Hi guys, have your completed your design",
        },
        { id: 2, idUser: 6, message: "Hello" },
        { id: 3, idUser: 6, message: "My name is Nacho" },
      ],
    },
  ],
  createUser: [],
  userLogin: null,
  userInformation: null,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //CHATS
    case SEND_MESSAGE: {
      return {
        ...state,
        messages: sendMessage(state.messageChats, action.id, action.payload),
      };
    }
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
    default:
      return state;
  }
};

export default rootReducer;
