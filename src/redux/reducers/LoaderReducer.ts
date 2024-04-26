import { SET_LOADER_VISIBLE } from "redux/actionConstants";

const INITIAL_STATE = {
  visible: false,
};

const loaderReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SET_LOADER_VISIBLE: {
      return {
        ...state,
        visible: action.payload,
      };
    }
    default:
      return state;
  }
};
export default loaderReducer;
