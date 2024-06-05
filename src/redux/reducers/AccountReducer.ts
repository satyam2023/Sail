
import { SET_USER_DATA} from "../actionConstants";


const INITIAL_STATE = {
  data: {
    user: {},
  },
};




const accountReducer = (state = INITIAL_STATE, action:any) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        data: action.payload,
      };
    }
    default:
      return state;
  }
};
export default accountReducer;
