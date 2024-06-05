
import { SignInResponse } from "models/ApiResponses/SignInResponse";
import { ISignupBody } from "models/ApiResponses/SignUpResponse";
import { SET_USER_DATA} from "redux/actionConstants";

export const saveUserdata = (data:SignInResponse|undefined|ISignupBody ) => {
  return {
    type: SET_USER_DATA,
    payload: data,
  };
};




