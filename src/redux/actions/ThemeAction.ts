import { SET_APP_THEME } from "../actionConstants";

export const setAppTheme = (theme: boolean) => {
  return {
    type: SET_APP_THEME,
    payload: theme,
  };
};
