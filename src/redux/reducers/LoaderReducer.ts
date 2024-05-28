import {
  INVALID_CREDENTIAL,
  PENDING_APPROVAL,
  SET_LOADER_VISIBLE,
} from "redux/actionConstants";

const INITIAL_STATE = {
  visible: false,
  pendingApprovalVisible: false,
  invalidCredentials: false,
};

const loaderReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_LOADER_VISIBLE: {
      return {
        ...state,
        visible: action.payload,
      };
    }
    case PENDING_APPROVAL: {
      return {
        ...state,
        pendingApprovalVisible: action.payload,
      };
    }
    case INVALID_CREDENTIAL: {
      return {
        ...state,
        invalidCredentials: action.payload,
      };
    }
    default:
      return state;
  }
};
export default loaderReducer;
