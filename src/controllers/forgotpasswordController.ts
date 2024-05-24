import APIConstants from "core/ApiConstants";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { IRequestOTP,ResetOtpResponse, VerifyOtpResponse } from "models/ApiResponses/IForgotPassword";
import { sendPostRequest } from "services/network/Network";

export const requestOTP = async (body: any) => {
    try {
      const res: IApiResponse<IRequestOTP> =
        await sendPostRequest<IRequestOTP>(APIConstants.REQUEST_OTP, body);
      return res;
    } catch (e: any) {
      return e;
    }
  };



  export const verifyOTP = async (body: any) => {
    try {
      const res: IApiResponse<VerifyOtpResponse> =
      await sendPostRequest<VerifyOtpResponse>(APIConstants.VERIFY_OTP, body);
      return res;
    } catch (e) {
      return e;
    }
  };

  export const submitNewPassword = async (body: any) => {
    try {
      const res: IApiResponse<ResetOtpResponse> =
        await sendPostRequest<ResetOtpResponse>(
          APIConstants.RESET_PASSWORD,
          body,
        );
      return res;
    } catch (e: any) {
      return e;
    }
  };
  