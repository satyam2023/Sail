import APIConstants from "core/ApiConstants";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { RequestOtpResponse } from "models/ApiResponses/IForgotPassword";
import { sendPostRequest } from "services/network/Network";

export const requestOTP = async (body: any) => {
    try {
      const res: IApiResponse<RequestOtpResponse> =
        await sendPostRequest<RequestOtpResponse>(APIConstants.REQUEST_OTP, body);
      return res;
    } catch (e: any) {
      return e;
    }
  };