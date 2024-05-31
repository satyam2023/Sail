import { replace } from "@navigation";
import { SCREENS } from "@shared-constants";
import {
  requestOTP,
  submitNewPassword,
  verifyOTP,
} from "controllers/forgotpasswordController";
import useForm from "core/UseForm";
import {
  forgotValidationRules,
  passwordValidationRules,
} from "helper/ValidationRegex";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import {
  IRequestOTP,
  ResetOtpResponse,
  VerifyOtpResponse,
} from "models/ApiResponses/IForgotPassword";
import {
  IForgotPasswordEnteredDetail,
  IOTPFields,
} from "models/interface/IForgotPassword";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import StringConstants from "shared/localization";
import ForgotPasswordScreen from "views/forgotpassword/ForgotPasswordScreen";

const ForgotPasswordViewModel = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [timerEnd, setTimerstatus] = useState<boolean>(false);
  const [token, setToken] = useState<string>();
  const dispatch = useDispatch();
  const buttonText = [
    StringConstants.GET_OTP,
    StringConstants.CONTINUE,
    StringConstants.RESET_PASSWORD,
  ];

  const enteredOTP = useRef(new Array(5));

  const inputFieldRef: IOTPFields = {
    first: useRef(null),
    second: useRef(null),
    third: useRef(null),
    forth: useRef(null),
    fifth: useRef(null),
  };

  const getOTP = async () => {
    try {
      dispatch(setLoaderVisibility(true));
      const body = {
        user_upn: forgotPasswordValues?.current?.upn,
        user_number: forgotPasswordValues?.current?.contact,
      };
      const res: IApiResponse<IRequestOTP> = await requestOTP(body);
      if (res?.isSuccess) {
        setToken(res?.data?.data?.token);
        setCurrentScreen(2);
      }
    } catch (error) {
      logger(error, "Error in GetOTP");
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };

  const OtpVerifier = async () => {
    dispatch(setLoaderVisibility(true));
    const body = {
      token: token,
      otp: enteredOTP.current.join(""),
    };
    try {
      const res: IApiResponse<VerifyOtpResponse> = await verifyOTP(body);
      dispatch(setLoaderVisibility(false));
      if (res.isSuccess) {

      } else {
        
      }
    } catch (error) {
      logger(error, "ForgotPasswordViewModel: OTPButtonHandler", "error");
    }
  };

  const resetPassword = async () => {
    dispatch(setLoaderVisibility(true));
    if (
      passwordsValue.current.Password !==
      passwordsValue.current.Confirm_Password
    ) {
      dispatch(setLoaderVisibility(false));
    } else {
      const body = {
        token: token,
        password: passwordsValue.current.Password,
        c_password: passwordsValue.current.Confirm_Password,
      };
      try {
        const res: IApiResponse<ResetOtpResponse> = await submitNewPassword(
          body,
        );
        dispatch(setLoaderVisibility(false));
        if (res.isSuccess) {
          replace(SCREENS.SIGNIN);
        } else {
        }
      } catch (error) {
        logger(error, "ForgotPasswordViewModel: onResetPassword", "error");
      } finally {
        dispatch(setLoaderVisibility(false));
      }
    }
  };

  const forgotPasswordEnteredDetails: IForgotPasswordEnteredDetail = {
    upn: "",
    contact: "",
  };

  const {
    values: forgotPasswordValues,
    errors: forgotPasswordErrors,
    handleSubmit: handleSubmitOfGetOTP,
    handleTextChange: handleTextChangeOfSendOTP,
  } = useForm(forgotPasswordEnteredDetails, forgotValidationRules, getOTP);

  const passwordEntered = {
    Password: "",
    Confirm_Password: "",
  };

  const {
    values: passwordsValue,
    errors: createPasswordError,
    handleSubmit: handleSubmitPassword,
    handleTextChange: handleTextChangeOfPassword,
  } = useForm(passwordEntered, passwordValidationRules, resetPassword);

  const handleUpnContactEntered = (text: string, id: number) =>
    handleTextChangeOfSendOTP(
      Object.keys(forgotPasswordEnteredDetails)[id],
      text,
    );

  const handleVerifyOtp = () => {
    enteredOTP.current.join("").length == 5 && OtpVerifier();
  };

  const handleButtonClicked = () => {
    currentScreen == 1 && handleSubmitOfGetOTP();
    currentScreen == 2 && handleVerifyOtp();
    currentScreen == 3 && handleSubmitPassword();
  };

  const handleOtpEntered = (text: string, id: number) => {
    if (!text) return;
    enteredOTP.current[id] = text;
    id < 4 && inputFieldRef[Object.keys(inputFieldRef)[id + 1]].current.focus();
  };

  const handleResendOTP=()=>{
    setTimerstatus(false);
    getOTP();
  }

  const handleTimer = () => setTimerstatus(true);

  const handleEnteredPassword = (text: string, id: number) => {
    handleTextChangeOfPassword(Object.keys(passwordEntered)[id], text);
  };

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
        forgotPasswordErrors,
        handleOtpEntered,
        handleEnteredPassword,
        createPasswordError,
        inputFieldRef,
      }}
    />
  );
};

export default ForgotPasswordViewModel;
