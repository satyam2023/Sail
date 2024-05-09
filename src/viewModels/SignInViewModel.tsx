import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import { userSignIn } from "controllers/accountController";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import {
  ISignInUserData,
  SignInResponse,
} from "models/ApiResponses/SignInResponse";
import { IBiometricStatus} from "models/interface/ISignIn";
import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { saveUserdata } from "redux/actions/AccountAction";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { setRememberMe } from "shared/constants/accountService";
import SignInScreen from "views/signIn/SignIn";
import * as Keychain from "react-native-keychain";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
import useForm, { FormValues } from "core/UseForm";
import { signInValidationRules } from "helper/ValidationRegex";
import { isAndroid } from "libs";

const SignInViewModel = () => {
  const userDetail: FormValues = {
    upn: "",
    password: "",
    rememberMe: '1',
  };
  const onSubmit = () => {
    handleFormSubmit();
  };
  const loginUser = () => {
    const values = {
      upn: userDetailValue.current.upn,
      password: userDetailValue.current.password,
    };
    loginAPICAllingHandler(values);
  };
  const {
    values: userDetailValue,
    errors: signinError,
    handleSubmit: handleFormSubmit,
    handleTextChange: handleSignInTextChange,
  } = useForm(userDetail, signInValidationRules, loginUser);

  

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
        setRememberMe(Number(userDetailValue.current.rememberMe));
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

  function biometricAuthentication() {
    authenticateFingerPrint();
  }

  const authenticateFingerPrint = async () => {
    rnBiometrics
      .simplePrompt({ promptMessage: isAndroid?"Confirm FingerPrint":"Confirm FaceId"})
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
    id != 2
      ? handleSignInTextChange(Object.keys(userDetail)[id], text)
      : handleSignInTextChange(Object.keys(userDetail)[id], text);
  }
  return (
    <SignInScreen
      {...{
        onSubmit,
        handleOnTextChange,
        biometricAuthentication,
        isBiometricsAvl,
        signinError,
      }}
    />
  );
};

export default SignInViewModel;
