import { SET_APP_THEME } from "../actionConstants";
import { IBaseReducerInterface } from "./IBaseReducerInterface";

const INITIAL_STATE = {
  isDarkMode: false,
};
interface ITheme {
  isDarkMode: boolean;
}

const themeReducer = (
  state = INITIAL_STATE,
  action: IBaseReducerInterface<ITheme>,
) => {
  switch (action.type) {
    case SET_APP_THEME: {
      return {
        ...state,
        isDarkMode: action.payload,
      };
    }
    default:
      return state;
  }
};
export default themeReducer;
