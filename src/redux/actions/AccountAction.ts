
import { SET_USER_DATA, UPDATE_USER_DATA } from "redux/actionConstants";

export const saveUserdata = (data:any ) => {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
};

export const updateUserData = (data: any) => {
  return {
    type: UPDATE_USER_DATA,
    payload: data,
  };
};


