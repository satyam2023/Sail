import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import {
  validateNameEmailLocation,
  validatePasswordAndCpassword,
  validateUpnAndContact,
} from "helper/ValidationRegex";
import { ISignupBody, SAPResponse } from "models/ApiResponses/SignUpResponse";
import SignUpScreen from "views/signup/SignUpScreen";
import { saveUserdata } from "redux/actions/AccountAction";
import { Iuserdetail } from "models/interface/ISignUp";
import { store } from "redux/store/Store";
import { IdropDown } from "models/interface/ISetting";
import {
  SAPUserAlreadyExist,
  signupAction,
} from "controllers/accountController";
import { getRoleId, logger } from "helper/helperFunctions";

const SignUpScreenViewMOdel = () => {
  const [CurrentScreen, setCurrentScreen] = useState<number>(1);
  const [buttonStatus, setButtonStatus] = useState<boolean>(false);
  const [alreadyExist, setAlreadyExist] = useState<boolean>(false);
  const [error, setError] = useState({
    upn: null,
    Contact: null,
    Name: null,
    Email: null,
    Location: null,
    Role: null,
    Password: null,
    Confirm_Password: null,
  });
  const userDetail: Iuserdetail = {
    Upn: useRef<string>(""),
    Contact: useRef<string>(""),
    Name: useRef<string>(""),
    Email: useRef<string>(""),
    Location: useRef<string>(""),
    Role: useRef<string>(""),
    Password: useRef<string>(""),
    Confirm_Password: useRef<string>(""),
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !error.upn &&
      !error.Contact &&
      userDetail.Upn.current.length > 2 &&
      CurrentScreen == 1 &&
      !alreadyExist
    )
      setCurrentScreen(2);
    else if (
      !error.Name &&
      !error.Email &&
      !error.Location &&
      !error.Role &&
      userDetail.Name.current.length>1 &&
      CurrentScreen == 2
    )
      setCurrentScreen(3);
    else if (
      !error.Password &&
      !error.Confirm_Password &&
      userDetail.Password.current == userDetail.Confirm_Password.current &&
      userDetail.Password.current.length > 0 &&
      CurrentScreen == 3
    ) {
      setCurrentScreen(1);
      signup();
    }
  }, [error]);

  useEffect(() => setButtonStatus(false), [CurrentScreen]);
  const dropdownData = store?.getState()?.masterData?.masterData;

  const locationAndRoleDropDown: IdropDown[][] = [
    dropdownData?.data?.LocationData,
    dropdownData?.data?.RolesData,
  ];
  const signup = async () => {
    dispatch(setLoaderVisibility(true));
    const body = {
      user_upn: userDetail.Upn.current,
      user_number: userDetail.Contact.current,
      user_name: userDetail.Name.current,
      email: userDetail.Email.current,
      user_location: userDetail.Location.current,
      user_role: getRoleId(locationAndRoleDropDown[1], userDetail?.Role?.current),
      password: userDetail.Password.current,
      c_password: userDetail.Confirm_Password.current,
      autologin: "0",
    };
    try {
      const res: IApiResponse<ISignupBody> = await signupAction(body);
      if (res.isSuccess) {
        dispatch(saveUserdata(res.data));
      } else {
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };

  

  function setScreen(CurrentScreen: number) {
    setCurrentScreen(CurrentScreen);
  }

  function handleOnTextChange(text: string, id: number) {
    userDetail[Object.keys(userDetail)[id]].current = text;
    checkButtonStatus();
  }

  const checkSAPUser = async () => {
    const body = {
      user_upn: userDetail?.Upn?.current,
      user_number: userDetail?.Contact?.current,
    };
    try {
      dispatch(setLoaderVisibility(true));
      const res: IApiResponse<SAPResponse> = await SAPUserAlreadyExist(body);
      if (res?.isSuccess) {
        if (res?.data?.data?.data?.Status != "1") {
          setAlreadyExist(true);
        } else if (alreadyExist) {
          setAlreadyExist(false);
        }
      }
    } catch (error) {
      logger("CHECK SAP USER");
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };

  function checkButtonStatus() {
    if (CurrentScreen == 1) {
      if (
        userDetail.Upn.current.length > 0 &&
        userDetail.Contact.current.length > 0
      ) {
        setButtonStatus(true);
      } else if (
        (buttonStatus && userDetail.Upn.current.length == 0) ||
        userDetail.Contact.current.length == 0
      ) {
        setButtonStatus(false);
      }
    } else if (CurrentScreen == 2) {
      for (let i = 2; i <= 5; i++) {
        if (userDetail[Object.keys(userDetail)[i]].current.length == 0) {
          if (buttonStatus) setButtonStatus(false);
          return;
        }
      }
      setButtonStatus(true);
    } else if (CurrentScreen == 3) {
      for (let i = 6; i <= 7; i++) {
        if (userDetail[Object.keys(userDetail)[i]].current.length == 0) {
          if (buttonStatus) setButtonStatus(false);
          return;
        }
      }
      setButtonStatus(true);
    }
  }

  const Submit = async () => {
    if (CurrentScreen == 1) {
      await checkSAPUser();
      validateUpnAndContact(userDetail, setError);
    } else if (CurrentScreen == 2) {
      validateNameEmailLocation(userDetail, setError);
    } else if (CurrentScreen == 3) {
      validatePasswordAndCpassword(userDetail, setError);
    }
  };

  return (
    <SignUpScreen
      {...{
        setScreen,
        CurrentScreen,
        userDetail,
        Submit,
        error,
        handleOnTextChange,
        buttonStatus,
        locationAndRoleDropDown,
        alreadyExist,
      }}
    />
  );
};

export default SignUpScreenViewMOdel;
