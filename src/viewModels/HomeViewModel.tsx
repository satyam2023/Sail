import React, { useEffect } from "react";
import HomeScreen from "views/home/HomeScreen";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "redux/store/Store";
import {
  allDropDownListApiCall,
  fetchHomeData,
  setMasterData,
} from "controllers/homeController";
import { getIssue } from "controllers/dropDownDataController";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { HomeResponse } from "models/ApiResponses/HomeResponse";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { saveHomeData } from "redux/actions/HomeAction";
import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import { EnquiryType, setCustomerInformationTab } from "redux/actions/UIAction";
import StringConstants from "shared/localization";

const HomeScreenViewModel = () => {
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: RootState) => state.userAccount.data.data,
  );
  const homeScreenData = useSelector(
    (state: RootState) => state?.home?.data?.data,
  );

  const handleListClick = () => {};
  async function handleHomeApiCall(dispatch: any) {
    const fetchHome = async () => {
      dispatch(setLoaderVisibility(true));
      try {
        const res: IApiResponse<HomeResponse> | undefined =
          await fetchHomeData();
        if (res?.isSuccess) {
          dispatch(saveHomeData(res.data));
        }
      } catch (error) {
      } finally {
        dispatch(setLoaderVisibility(false));
      }
    };
    fetchHome();
  }

  useEffect(() => {
    try {
      dispatch(setLoaderVisibility(true));
      handleHomeApiCall(dispatch), setMasterData(dispatch), getIssue(dispatch);
      allDropDownListApiCall(dispatch);
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  }, []);

  const handleProductCatalougeListClick = () => {
    navigate(SCREENS.PRODUCTCATALOUGE);
  };

  const handleCustomerInformationListClick = (index: number) => {
    dispatch(setCustomerInformationTab(index));
    navigate(SCREENS.CUSTOMER_INFO);
  };
  const handleEnquiryClick = (index: number) => {
    dispatch(EnquiryType(index + 1));
    navigate(SCREENS.ENQUIRY);
  };

  const handleHorizontalScrollableClick = (id: number, index: number) => {
    id == 1 && handleProductCatalougeListClick();
    id == 2 && handleCustomerInformationListClick(index);
    id == 3 && handleEnquiryClick(index);
  };

  const onClickEventOnUpperTextOfHorizontalList = (id: number) => {
    id == 1 && navigate(SCREENS.PRODUCTCATALOUGE);
    id == 3 && handleEnquiryClick(2);
  };

  const handleMsg_Noti_Setiing = (type: string) => {
    switch (type) {
      case StringConstants.MESSAGE_DETAILS:
        navigate(SCREENS.MESSAGE);
        break;
      case StringConstants.NOTIFICATIONS:
        navigate(SCREENS.NOTIFICATION);
        break;
      case StringConstants.SETTINGS:
        navigate(SCREENS.SETTING);
        break;
    }
  };

  return (
    <HomeScreen
      {...{
        userData,
        homeScreenData,
        handleListClick,
        handleHorizontalScrollableClick,
        onClickEventOnUpperTextOfHorizontalList,
        handleMsg_Noti_Setiing,
      }}
    />
  );
};

export default HomeScreenViewModel;
