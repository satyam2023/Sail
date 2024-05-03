import { requestOTP } from "controllers/forgotpasswordController";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { RequestOtpResponse } from "models/ApiResponses/IForgotPassword";
import { IForgotPasswordEnteredDetail } from "models/interface/IForgotPassword";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import StringConstants from "shared/localization";
import ForgotPasswordScreen from "views/forgotpassword/ForgotPasswordScreen";

const ForgotPasswordViewModel = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);

  const dispatch = useDispatch();
  const buttonText = [
    StringConstants.GET_OTP,
    StringConstants.CONTINUE,
    StringConstants.RESET_PASSWORD,
  ];
  useEffect(() => {
    if (currentScreen == 2) {

    }
  }, [currentScreen]);

  const forgotPasswordEnteredDetail: IForgotPasswordEnteredDetail = {
    upn: useRef<string>(""),
    contact: useRef<string>(""),
  };

  const getOTP = async () => {
    dispatch(setLoaderVisibility(true));
    try {
      const body = {
        user_upn: forgotPasswordEnteredDetail?.upn?.current,
        user_number: forgotPasswordEnteredDetail?.contact?.current,
      };
      const res: IApiResponse<RequestOtpResponse> = await requestOTP(body);
      dispatch(setLoaderVisibility(false));
    } catch (error) {
      logger(error, "ForgotPasswordViewModel: requestOTPFun", "error");
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };

  function handleUpnContactEntered(text: string, id: number) {
    forgotPasswordEnteredDetail[
      Object.keys(forgotPasswordEnteredDetail)[id]
    ].current = text;
  }

  function handleButtonClicked() {
    if (currentScreen == 1) {
      getOTP();
      setCurrentScreen(2);
    }
  }

  return (
    <ForgotPasswordScreen
      {...{
        currentScreen,
        buttonText,
        handleUpnContactEntered,
        handleButtonClicked,
      }}
    />
  );
};

export default ForgotPasswordViewModel;
