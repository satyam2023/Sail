import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import {
  ISignInUserData,
  SignInResponse,
} from "models/ApiResponses/SignInResponse";
import { ISignupBody, SAPBody } from "models/ApiResponses/SignUpResponse";
import { sendPostRequest } from "services/network/Network";

export const userSignIn = async (data: ISignInUserData) => {
  try {
    const body = {
      user_upn: data.upn,
      password: data.password,
    };
    const res: IApiResponse<SignInResponse> =
      await sendPostRequest<SignInResponse>(APIConstants.SIGNIN, body);
    return res;
  } catch (error) {
    logger(error);
    
  } finally {
  }
};

export const saveUserToken = async (_: any, body: any) => {
  try {
    const res: IApiResponse<SignInResponse> =
      await sendPostRequest<SignInResponse>(APIConstants.SAVE_TOKEN, body);
    return res;
  } catch (error) {
    logger(error);
    
  } finally {
  }
};






export const signupAction = async (body: ISignupBody) => {

  try {
    return await sendPostRequest<ISignupBody>(APIConstants.SIGNUP, body);
  } catch (e) {
    logger("Error message of Sign up Action");
  }
};


export const SAPUserAlreadyExist = async (body: SAPBody) => {
  try {
    return await sendPostRequest<SAPBody>(APIConstants.SAP_VALIDATION, body);
  } catch (error) {
      logger("Error in Checking already existing user")
  }
};






