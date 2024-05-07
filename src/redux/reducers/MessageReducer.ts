import { SET_ESCALATED_DATA, SET_MESSAGE_DATA } from "../actionConstants";

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
    case SET_ESCALATED_DATA: {
      return {
        ...state,
        EscaletedDropDownData: action.payload,
      };
    }
    default:
      return state;
  }
};
export default messageReducer;
