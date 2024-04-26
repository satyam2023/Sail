import { SET_PLANNED_MEETINGS } from "../actionConstants";

const INITIAL_STATE = {
  data: [],
};

const createMeetingReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_PLANNED_MEETINGS: {
      return {
        ...state,
        data: [...state.data,...action.payload?.data?.data?.data],
      };
    }
    default:
      return state;
  }
};

export default createMeetingReducer;
