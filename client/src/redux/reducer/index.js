import { INCREMENT } from "../actions";

const initialState = {
  value: 0,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT: {
      return {
        ...state,
        value: state.value + 1,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
