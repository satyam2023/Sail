import { UPDATED_BASE_URL } from "redux/actionConstants";

const INITIAL_STATE = {
  baseURL: "https://cmoccuat.sailcmo.co.in:8000/api",
  // baseURL:"http://117.250.72.24:8000/api",
  // baseURL:  "http://117.250.72.24:8000/api",
};

const updatedBaseURLReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case UPDATED_BASE_URL:
      return {
        ...state,
        baseURL: action.payload,
      };
    default:
      return state;
  }
};

export default updatedBaseURLReducer;
