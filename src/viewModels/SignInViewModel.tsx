import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import { userSignIn } from "controllers/accountController";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import {
  ISignInUserData,
  SignInResponse,
} from "models/ApiResponses/SignInResponse";
import { IBiometricStatus, ISignInUser } from "models/interface/ISignIn";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { saveUserdata } from "redux/actions/AccountAction";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { setRememberMe } from "shared/constants/accountService";
import SignInScreen from "views/signIn/SignIn";
import * as Keychain from "react-native-keychain";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

const SignInViewModel = () => {
  const signInUser: ISignInUser = {
    upn: useRef<string>(""),
    password: useRef<string>(""),
    rememberMe: useRef<number>(1),
  };
  const [isBiometricsAvl, setBiometric] = useState<IBiometricStatus>({
    faceId: false,
    fingerId: false,
  });

  const dispatch = useDispatch();

  const loginAPICAllingHandler = async (values: ISignInUserData) => {
    dispatch(setLoaderVisibility(true));
    try {
      const res: IApiResponse<SignInResponse> | undefined = await userSignIn(
        values,
      );
      if (res?.isSuccess) {
        dispatch(saveUserdata(res?.data));
        setRememberMe(signInUser?.rememberMe?.current);
        navigate(SCREENS.TAB);
        saveCredentails(values);
      } else {
      }
    } catch (error) {
      logger(error, "Error in Login Api Calling");
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };

  const saveCredentails = async (values: ISignInUserData) => {
    const username = values?.upn;
    const password = values?.password;
    await Keychain.setGenericPassword(username, password);
  };

  useEffect(() => {
    isDeviceSupportBiometrics();
  }, []);

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  const isDeviceSupportBiometrics = async () => {
    rnBiometrics.isSensorAvailable().then((resultObject) => {
      const { available, biometryType } = resultObject;
      if (available && biometryType === BiometryTypes.TouchID) {
        setBiometric((prev: IBiometricStatus) => ({
          ...prev,
          fingerId: true,
        }));
      } else if (available && biometryType === BiometryTypes.FaceID) {
        setBiometric((prev: IBiometricStatus) => ({
          ...prev,
          faceId: true,
        }));
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        setBiometric((prev: IBiometricStatus) => ({
          ...prev,
          fingerId: true,
        }));
      }
    });
  };

  const onSubmit = () => {
    const values = {
      upn: signInUser?.upn?.current,
      password: signInUser?.password?.current,
    };
    //  navigate(SCREENS.TAB);
    loginAPICAllingHandler(values);
  };

  function biometricAuthentication() {
    authenticateFingerPrint();
  }

  const authenticateFingerPrint = async () => {
    rnBiometrics
      .simplePrompt({ promptMessage: "Confirm FingerPrint" })
      .then(async (resultObject) => {
        const { success } = resultObject;
        if (success) {
          try {
            const getCredentials: any = await Keychain.getGenericPassword();
            const values = {
              upn: getCredentials.username,
              password: getCredentials.password,
            };
            console.log("Values", await Keychain.getGenericPassword());
            if (getCredentials) {
              loginAPICAllingHandler(values);
            } else {
            }
          } catch (e) {
            logger(e, "Error in getting KeyChain Credentials");
          }
        } else {
        }
      })
      .catch((e) => {
        logger(e, "Face Authentication Error.");
      });
  };

  function handleOnTextChange(text: string, id: number) {
    if (id != 2) signInUser[Object.keys(signInUser)[id]].current = text;
    else signInUser.rememberMe.current = Number(text);
  }

  return (
    <SignInScreen
      {...{
        onSubmit,
        handleOnTextChange,
        signInUser,
        biometricAuthentication,
        isBiometricsAvl,

      }}
    />
  );
};

export default SignInViewModel;
