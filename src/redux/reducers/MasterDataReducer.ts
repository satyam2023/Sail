import { SET_MASTER_DATA } from "../actionConstants";

const INITIAL_STATE = {
  masterData: {},
};

const masterDataReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_MASTER_DATA: {
      return {
        ...state,
        masterData: action.payload,
      };
    }

    default:
      return state;
  }
};
export default masterDataReducer;
