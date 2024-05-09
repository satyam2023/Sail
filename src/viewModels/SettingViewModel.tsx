import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import { logOutUser } from "controllers/logoutController";
import { detailUpdate } from "controllers/settingController";
import useForm, { FormValues } from "core/UseForm";
import { detailUpdatevalidationRules } from "helper/ValidationRegex";
import { convertToArray, logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { SettingsResponse } from "models/ApiResponses/SettingResponse";
import React, {useState } from "react";
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

  const detailsToBeUpdated: FormValues = {
    email: userData?.user?.email,
    location: userData?.user?.user_location,
    role: userData?.user?.user_role,
  };

  const updateUser = () => {
    setDetailsUpdating(false);
    if (
      userData?.user?.user_location !=
        updatedEnteredValues?.current?.location ||
      userData?.user?.user_role != updatedEnteredValues?.current?.role ||
      userData?.user?.email != updatedEnteredValues?.current?.email
    ) {
      updateApiCalling();
    }
  };

  const {
    values: updatedEnteredValues,
    errors: emailError,
    handleSubmit: handleUpdate,
    handleTextChange: handleUpdateDetailTextChange,
  } = useForm(detailsToBeUpdated, detailUpdatevalidationRules, updateUser);

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
      logger(error, "Error in Logout Api");
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  }

  async function updateApiCalling() {
    dispatch(setLoaderVisibility(true));
    const body = {
      id: userData?.user?.id,
      user_location: updatedEnteredValues?.current?.location,
      email: updatedEnteredValues?.current?.email,
      user_role: Number(updatedEnteredValues?.current?.role),
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


  const  editDetails=(_: string, index: number)=> {
    index==-1?setDetailsUpdating(true):handleUpdate();
  }


  const handleOntextChange=(text: string | number, id: number) =>{
    handleUpdateDetailTextChange(
      Object.keys(detailsToBeUpdated)[id],
      text.toString(),
    );
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
        emailError,
      }}
    />
  );
};

export default SettingViewModel;
