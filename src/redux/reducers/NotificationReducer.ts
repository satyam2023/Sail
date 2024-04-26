import { SET_NOTIFICATION_DATA } from "../actionConstants";

const INITIAL_STATE = {
  data: {},
};

const notificationReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_NOTIFICATION_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default:
      return state;
  }
};
export default notificationReducer;
