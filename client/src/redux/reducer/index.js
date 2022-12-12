import { SEND_MESSAGE } from "../actions";

const initialState = {
  messages: [
    {
      id: 1,
      messageid: 1,
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Diego Apolo",
      message: "Hi guys, have your completed ypur design",
    },
    {
      id: 1,
      messageid: 2,
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Diego Apolo",
      message: "Hi guys, have your completed ypur design",
    },
    {
      id: 1,
      messageid: 3,
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Diego Apolo",
      message: "Hi guys, have your completed ypur design",
    },
    {
      id: 1,
      messageid: 4,
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Diego Apolo",
      message: "Hi guys, have your completed ypur design",
    },
    {
      id: 1,
      messageid: 5,
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Diego Apolo",
      message: "Hi guys, have your completed ypur design",
    },
    {
      messageid: 6,
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Diego Apolo",
      message: "Hi guys, have your completed ypur design",
    },
    {
      id: 1,
      messageid: 7,
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Diego Apolo",
      message: "Hi guys, have your completed ypur design",
    },
    {
      id: 1,
      messageid: 8,
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Diego Apolo",
      message: "Hi guys, have your completed ypur design",
    },
    {
      id: 2,
      messageid: 9,
      image:
        "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Diego Apolo",
      message: "Hi guys, have your completed ypur design",
    },
  ],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    //CHATS
    case SEND_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
