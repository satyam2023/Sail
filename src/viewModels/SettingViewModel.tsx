import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import { logOutUser } from "controllers/logoutController";
import { detailUpdate } from "controllers/settingController";
import { convertToArray, logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { SettingsResponse } from "models/ApiResponses/SettingResponse";
import { IUpdatedetails } from "models/interface/ISetting";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { store } from "redux/store/Store";
import { removeRememberMe } from "shared/constants/accountService";
import SettingScreen from "views/setting/Setting";

const SettingViewModel = () => {
  const dispatch = useDispatch();
  const [isDetailsUpdating, setDetailsUpdating] = useState<boolean>(false);
 
  let userData = store?.getState()?.userAccount?.data?.data;
  let roleLocationDropDownList =
    store?.getState()?.masterData?.masterData?.data;
  const updatedDetails: IUpdatedetails = {
    email: useRef(userData?.user?.email),
    Location: useRef(userData?.user?.user_location),
    Role: useRef(userData?.user?.user_role),
  };
  const dataofInputField = convertToArray(userData);



  async function logOutApiCalling() {
    dispatch(setLoaderVisibility(true));
    const data = {};
    try {
      const res: IApiResponse<SettingsResponse> = await logOutUser(data);
      if (res?.isSuccess) {
        removeRememberMe();
        navigate(SCREENS.SIGNIN);
      }
    } catch (error) {
        logger(error,"Error in Logout Api")
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  }


  async function updateApiCalling() {
    dispatch(setLoaderVisibility(true));
    const body = {
      id: userData?.user?.id,
      user_location: updatedDetails?.Location.current,
      email: updatedDetails?.email.current,
      user_role: updatedDetails?.Role.current,
    };
    try {
      const res: IApiResponse<SettingsResponse> = await detailUpdate(body);
      if (res?.isSuccess) {
        logOutApiCalling();
      }
    } catch (error) {
      logger(error, "Error in Update User Details Api Calling");
    }
    dispatch(setLoaderVisibility(false));
  }

  function editDetails(_: string, index: number) {
    if (index == -1) setDetailsUpdating(true);
    else if (index == -2) {
      setDetailsUpdating(false);
      if (
        userData?.user?.user_location != updatedDetails.Location.current ||
        userData?.user?.user_role != updatedDetails.Role.current ||
        userData?.user?.email != updatedDetails.email.current
      ) {
        updateApiCalling();
      }
    }
  }

  function handleOntextChange(text: string | number, id: number) {
    updatedDetails[Object.keys(updatedDetails)[id]].current = text;
  }

  return (
    <SettingScreen
      {...{
        userData,
        logOutApiCalling,
        dataofInputField,
        editDetails,
        updateApiCalling,
        isDetailsUpdating,
        roleLocationDropDownList,
        handleOntextChange,
      }}
    />
  );
};

export default SettingViewModel;
