import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import {
  setLoaderVisibility,
  setPendingApprovalPopUp,
} from "redux/actions/LoaderAction";
import {
  passwordValidationRules,
  personalValidationRules,
  roleValidationRules,
} from "helper/ValidationRegex";
import { ISignupBody, SAPResponse } from "models/ApiResponses/SignUpResponse";
import SignUpScreen from "views/signup/SignUpScreen";
import { saveUserdata } from "redux/actions/AccountAction";
import { store } from "redux/store/Store";
import { IdropDown } from "models/interface/ISetting";
import {
  SAPUserAlreadyExist,
  signupAction,
} from "controllers/accountController";
import {
  getRoleId,
  isAllInputFieldHaveData,
  logger,
} from "helper/helperFunctions";
import useForm, { FormValues } from "core/UseForm";

const SignUpScreenViewMOdel = () => {
  const [CurrentScreen, setCurrentScreen] = useState<number>(1);
  const [buttonStatus, setButtonStatus] = useState<boolean>(false);
  const [alreadyExist, setAlreadyExist] = useState<boolean>(false);
  const upn_contact_values: FormValues = {
    Upn: "",
    Contact: "",
  };

  const roleNameDetails: FormValues = {
    Name: "",
    Email: "",
    Location: "",
    Role: "",
  };

  const passwords: FormValues = {
    Password: "",
    Confirm_Password: "",
  };

  const Submit = async () => {
    if(buttonStatus)
   switch (CurrentScreen) {
      case 1:
          handleContactSubmit();
        break;
      case 2:
        handleRoleSubmit();
        break;
      case 3:
          handlePasswordSubmit();
        break;
      default:
        break;
    }
  };

  const handleForward = async () => {
    if (CurrentScreen == 1 && (await checkSAPUser())) {
      setCurrentScreen(2);
    } else if (CurrentScreen == 2) {
      setCurrentScreen(3);
    } 
    setButtonStatus(false);
  };

  const {
    values,
    errors,
    handleSubmit: handleContactSubmit,
    handleTextChange,
  } = useForm(upn_contact_values, personalValidationRules, handleForward);

  const {
    values: passwordValues,
    errors: passwordErrors,
    handleSubmit: handlePasswordSubmit,
    handleTextChange: handlePasswordTextChange,
  } = useForm(passwords,passwordValidationRules, signup);

  const {
    values: rolenamevalues,
    errors: roleNameErrors,
    handleSubmit: handleRoleSubmit,
    handleTextChange: handleRoleTextChange,
  } = useForm(roleNameDetails, roleValidationRules, handleForward);

  const dispatch = useDispatch();
  const dropdownData = store?.getState()?.masterData?.masterData;

  const locationAndRoleDropDown: IdropDown[][] = [
    dropdownData?.data?.LocationData,
    dropdownData?.data?.RolesData,
  ];
  async function signup () {
    dispatch(setLoaderVisibility(true));
    const body = {
      user_upn: values.current.Upn,
      user_number: values.current.Contact,
      user_name: rolenamevalues.current.Name,
      email: rolenamevalues.current.Email,
      user_location: rolenamevalues.current.Location,
      user_role: getRoleId(
        locationAndRoleDropDown[1],
        rolenamevalues.current.Role,
      ),
      password: passwordValues.current.Password,
      c_password: passwordValues.current.Confirm_Password,
      autologin: "0",
    };
    try {
      const res: IApiResponse<ISignupBody> = await signupAction(body);
      if (res.isSuccess) {
        dispatch(setPendingApprovalPopUp(true));
        dispatch(saveUserdata(res?.data));
      }
    } catch (error) {
      logger(error, "Error in SignUp");
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };

  const setScreen=(CurrentScreen: number) =>  {
    setCurrentScreen(CurrentScreen);
    setButtonStatus(true);
  };
  

  const handleOnTextChange = (text: string, id: number) => {
    if (id < 2) {
      handleTextChange(Object.keys(upn_contact_values)[id], text);
    } else if (id >= 2 && id <= 5) {
      handleRoleTextChange(Object.keys(roleNameDetails)[id - 2], text);
    } else if (id > 5) {
      handlePasswordTextChange(Object.keys(passwords)[id - 6], text);
    }
    checkButtonStatus();
  };

  const checkSAPUser = async () => {
    const body = {
      user_upn: values.current.Upn,
      user_number: values.current.Contact,
    };
    try {
      dispatch(setLoaderVisibility(true));
      const res: IApiResponse<SAPResponse> = await SAPUserAlreadyExist(body);
      if (res?.isSuccess) {
        dispatch(setLoaderVisibility(false));
        if (res?.data?.data?.data?.Status != "1") {
          setAlreadyExist(true);
          return false;
        } else if (alreadyExist) {
          setAlreadyExist(false);
          return true;
        } else {
          return true;
        }
      }
    } catch (error) {
      logger("CHECK SAP USER");
      dispatch(setLoaderVisibility(false));
    }
  };

  const checkButtonStatus=()=>{
    if (CurrentScreen == 1) {
      if (values.current.Upn.length > 0 && values.current.Contact.length > 0) {
        setButtonStatus(true);
      } else if (
        (buttonStatus && values.current.Upn.length == 0) ||
        values.current.Contact.length == 0
      ) {
        setButtonStatus(false);
      }
    } else if (CurrentScreen == 2) {
      if (!isAllInputFieldHaveData(rolenamevalues)) {
        if (buttonStatus) setButtonStatus(false);
      } else {
        setButtonStatus(true);
      }
    } else if (CurrentScreen == 3) {
      if (!isAllInputFieldHaveData(passwordValues)) {
        if (buttonStatus) setButtonStatus(false);
      } else {
        setButtonStatus(true);
      }
    }
  }

  return (
    <SignUpScreen
      {...{
        errors,
        Submit,
        setScreen,
        buttonStatus,
        CurrentScreen,
        handleOnTextChange,
        locationAndRoleDropDown,
        alreadyExist,
        upn_contact_values,
        roleNameErrors,
        roleNameDetails,
        passwordErrors,
        values,
        rolenamevalues
      }}
    />
  );
};

export default SignUpScreenViewMOdel;
