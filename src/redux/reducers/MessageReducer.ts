import { SET_MESSAGE_DATA } from "../actionConstants";

const INITIAL_STATE = {
  inbox: [],
  EscaletedDropDownData: [],
};

const messageReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_MESSAGE_DATA: {
      return {
        ...state,
        inbox: action.payload,
      };
    }

    default:
      return state;
  }
};
export default messageReducer;
