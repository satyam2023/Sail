import Geolocation from "@react-native-community/geolocation";
import {
  getIssueEnquiry,
  getNearbyCustomer,
  getUserEnquiry,
} from "controllers/enquiryController";
import { checkOnlyNumber } from "helper/ValidationRegex";
import { isDetailFilled, logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import {
  IssueEnquiryBody,
  IssueEnquiryResponse,
  UserEnquiryResponse,
  IIssueEnquiry,
  INearbyCustomerResponse,
  INearbyCustomer,
  IButtonStatus,
} from "models/ApiResponses/IEnquiryResponses";
import {
  IissueEnquiryEnteredData,
  IuserEnquiryEnteredData,
} from "models/interface/IEnquiry";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { store } from "redux/store/Store";
import StringConstants from "shared/localization";
import EnquiryScreen from "views/enquiry/EnquiryScreen";

const EnquiryViewModel = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [searchresult, setsearchresult] = useState<UserEnquiryResponse>();
  const [issueSearchresult, setIssueSearchResult] = useState<IIssueEnquiry[]>();
  const [issueEnquiryType, setIssueEnquiryType] = useState<string>(
    StringConstants.OPEN_ISSUES,
  );
  const [btnStatus, setBtnStatus] = useState<IButtonStatus>({
    enquiryBtn: false,
    issueBtn: false,
  });

  const selectedEnquiry = useSelector(
    (state: any) => state?.UIReducer?.enquiryType,
  );
  useEffect(() => {
    nearbyCustomer();
    setCurrentScreen(selectedEnquiry);
  }, [selectedEnquiry]);
  const dispatch = useDispatch();
  const roleLocationDropDownList =
    store?.getState()?.masterData?.masterData?.data;
  const userEnquiryEnteredDetail: IuserEnquiryEnteredData = {
    name: useRef<string>(""),
    location: useRef<string>(""),
  };
  const issueEnquiryEnteredDetail: IissueEnquiryEnteredData = {
    customerCodeName: useRef<string>(""),
    location: useRef<string>(""),
  };

  // const resetIssueEnquiryDetails=()=>{
  //   issueEnquiryEnteredDetail.customerCodeName.current="";
  //   issueEnquiryEnteredDetail.location.current="";
  // }

  const [NearByCustomerList, setNearByCustomerList] = useState<
    INearbyCustomer[] | undefined
  >();

  const userEnquiryApi = async () => {
    const body = {
      user_name: userEnquiryEnteredDetail.name.current,
      user_location: userEnquiryEnteredDetail.location.current,
    };
    try {
      dispatch(setLoaderVisibility(true));
      const userRes: UserEnquiryResponse = await getUserEnquiry(body);
      setsearchresult(userRes);
    } catch (e) {
      logger(e, "Error in User Enquiry API Calling");
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };

  const issueEnquiry = async () => {
    dispatch(setLoaderVisibility(true));
    const body: IssueEnquiryBody = {
      issue_type: issueEnquiryType == StringConstants.OPEN_ISSUES ? 0 : 1,
      customer_code: checkOnlyNumber(
        issueEnquiryEnteredDetail.customerCodeName.current,
      )
        ? issueEnquiryEnteredDetail.customerCodeName.current
        : null,
      customer_name: checkOnlyNumber(
        issueEnquiryEnteredDetail.customerCodeName.current,
      )
        ? null
        : issueEnquiryEnteredDetail.customerCodeName.current,
      location: issueEnquiryEnteredDetail.location.current,
    };
    try {
      const res: IApiResponse<IssueEnquiryResponse> | undefined =
        await getIssueEnquiry(body);

      if (res?.isSuccess) {
        setIssueSearchResult(
          res?.data?.data[0]?.message ? [] : res?.data?.data,
        );
      }
    } catch (error) {
      logger(error, "Error in Issue Enquiry API Calling");
    }
    dispatch(setLoaderVisibility(false));
  };

  const nearbyCustomer = async () => {
    Geolocation.getCurrentPosition(
      async (pos: any) => {
        const body = {
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        };
       
        try {
          dispatch(setLoaderVisibility(true));
          const res: IApiResponse<INearbyCustomerResponse> | undefined =
            await getNearbyCustomer(body);
          if (res?.isSuccess) {
            setNearByCustomerList(res?.data?.data);
          }
        } catch (error) {
          logger(error, "NearbyCustomerViewModel", "error");
        } finally {
          dispatch(setLoaderVisibility(false));
        }
      },
      (error: Error) => logger(error, "getCurrentPosition", "error"),
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

 

  async function onSearch() {
    if (currentScreen == 1 && btnStatus.enquiryBtn) {
      userEnquiryApi();
    } else if (currentScreen == 2 && btnStatus.issueBtn) {
      issueEnquiry();
    }
  }

  const handleIssueEnquiry = (type: string) => {
    setIssueEnquiryType(type);
    setIssueSearchResult(undefined);
    setBtnStatus((prev: IButtonStatus) => ({
      ...prev,
      issueBtn: false,
    }));
  };

  const handleTextChangeofUserEnquiry = (text: string, id: number) => {
    userEnquiryEnteredDetail[
      Object.keys(userEnquiryEnteredDetail)[id]
    ].current = text;
    if (isDetailFilled(userEnquiryEnteredDetail)) {
      if (!btnStatus.enquiryBtn) {
        setBtnStatus((prev: IButtonStatus) => ({
          ...prev,
          enquiryBtn: true,
        }));
      }
    } else {
      if (btnStatus.enquiryBtn) {
        setBtnStatus((prev: IButtonStatus) => ({
          ...prev,
          enquiryBtn: false,
        }));
      }
    }
  };

  const handleTextChangeofIssueEnquiry = (text: string, id: number) => {
    issueEnquiryEnteredDetail[
      Object.keys(issueEnquiryEnteredDetail)[id]
    ].current = text;
    if (isDetailFilled(issueEnquiryEnteredDetail)) {
      if (!btnStatus.issueBtn) {
        setBtnStatus((prev: IButtonStatus) => ({
          ...prev,
          issueBtn: true,
        }));
      }
    } else {
      if (btnStatus.issueBtn) {
        setBtnStatus((prev: IButtonStatus) => ({
          ...prev,
          issueBtn: false,
        }));
      }
    }
  };

  return (
    <EnquiryScreen
      {...{
        currentScreen,
        setCurrentScreen,
        roleLocationDropDownList,
        userEnquiryEnteredDetail,
        searchresult,
        onSearch,
        issueSearchresult,
        issueEnquiryEnteredDetail,
        setIssueSearchResult,
        setsearchresult,
        NearByCustomerList,
        handleIssueEnquiry,
        issueEnquiryType,
        handleTextChangeofUserEnquiry,
        handleTextChangeofIssueEnquiry,
        btnStatus,
      }}
    />
  );
};

export default EnquiryViewModel;
