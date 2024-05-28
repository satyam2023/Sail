import { SET_PLANNED_MEETINGS, UPDATE_PLANNED_VISIT_MEETING } from "../actionConstants";

const INITIAL_STATE = {
  data: [],
  updatePlannedVisit:[],
};

const createMeetingReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_PLANNED_MEETINGS: {
      return {
        ...state,
        data: [...state.data,...action.payload?.data?.data?.data],
      };
    }
    case UPDATE_PLANNED_VISIT_MEETING:{
      return {
        ...state,
        updatePlannedVisit:action.payload
      }
    }
    default:
      return state;
  }
};

export default createMeetingReducer;
