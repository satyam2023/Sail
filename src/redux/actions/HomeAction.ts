import { HomeResponse } from "models/ApiResponses/HomeResponse";
import { SET_DASHBOARD_DATA } from "redux/actionConstants";



export const saveHomeData = (data: HomeResponse |undefined) => {
  return {
    type: SET_DASHBOARD_DATA,
    payload: data,
  };
};


