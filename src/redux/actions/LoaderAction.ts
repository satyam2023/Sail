import { SET_LOADER_VISIBLE } from "../actionConstants";

export const setLoaderVisibility = (isVisible: boolean) => {
  return {
    type: SET_LOADER_VISIBLE,
    payload: isVisible,
  };
};
