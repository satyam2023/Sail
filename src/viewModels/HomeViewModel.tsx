import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from "views/home/HomeScreen";
import { Colors } from "commonStyles/RNColor.style";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "redux/store/Store";
import { fetchHomeData, setMasterData } from "controllers/homeController";
import {
  getAccompanying,
  getIssue,
  getReasonContact,
} from "controllers/dropDownDataController";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { HomeResponse } from "models/ApiResponses/HomeResponse";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { saveHomeData } from "redux/actions/HomeAction";
import { navigate } from "@navigation";
import { SCREENS } from "@shared-constants";
import { EnquiryType, setCustomerInformationTab } from "redux/actions/UIAction";


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
      handleHomeApiCall(dispatch),
        setMasterData(dispatch),
        getAccompanying(dispatch),
        getReasonContact(dispatch),
        getIssue(dispatch);
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

  function handleHorizontalScrollableClick(id: number, index: number) {
    if (id == 1) handleProductCatalougeListClick();
    else if (id == 2) handleCustomerInformationListClick(index);
    else if (id == 3) handleEnquiryClick(index);
  }

  function onClickEventOnUpperTextOfHorizontalList(id: number) {
    if (id == 1) navigate(SCREENS.PRODUCTCATALOUGE);
    else if (id == 3) handleEnquiryClick(2);
  }

  return (
 
      <HomeScreen
        {...{
          userData,
          homeScreenData,
          handleListClick,
          handleHorizontalScrollableClick,
          onClickEventOnUpperTextOfHorizontalList,
        }}
      />

  );
};

export default HomeScreenViewModel;
