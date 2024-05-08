import { requestOTP } from "controllers/forgotpasswordController";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { RequestOtpResponse } from "models/ApiResponses/IForgotPassword";
import { IForgotPasswordEnteredDetail } from "models/interface/IForgotPassword";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import StringConstants from "shared/localization";
import ForgotPasswordScreen from "views/forgotpassword/ForgotPasswordScreen";

const ForgotPasswordViewModel = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [timerEnd, setTimerstatus] = useState<boolean>(false);
  const dispatch = useDispatch();
  const buttonText = [
    StringConstants.GET_OTP,
    StringConstants.CONTINUE,
    StringConstants.RESET_PASSWORD,
  ];

  const forgotPasswordEnteredDetail: IForgotPasswordEnteredDetail = {
    upn: useRef<string>(""),
    contact: useRef<string>(""),
  };

  const getOTP = async () => {
    try {
      dispatch(setLoaderVisibility(true));
      const body = {
        user_upn: forgotPasswordEnteredDetail?.upn?.current,
        user_number: forgotPasswordEnteredDetail?.contact?.current,
      };
      const res: IApiResponse<RequestOtpResponse> = await requestOTP(body);
    } catch (error) {
      logger(error, "Error in GetOTP");
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

  function handleResendOTP() {
    setTimerstatus(false);
    getOTP();
  }

  function handleTimer() {
    setTimerstatus(true);
  }

  return (
    <ForgotPasswordScreen
      {...{
        currentScreen,
        buttonText,
        handleUpnContactEntered,
        handleButtonClicked,
        handleTimer,
        timerEnd,
        handleResendOTP,
      }}
    />
  );
};

export default ForgotPasswordViewModel;
