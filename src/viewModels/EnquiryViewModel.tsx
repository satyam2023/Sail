import Geolocation from "@react-native-community/geolocation";
import {
  getIssueEnquiry,
  getNearbyCustomer,
  getUserEnquiry,
} from "controllers/enquiryController";
import { checkOnlyNumber } from "helper/ValidationRegex";
import { logger } from "helper/helperFunctions";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import {
  IssueEnquiryBody,
  IssueEnquiryResponse,
  UserEnquiryResponse,
  IIssueEnquiry,
  INearbyCustomerResponse,
  INearbyCustomer,
} from "models/ApiResponses/IEnquiryResponses";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { store } from "redux/store/Store";
import EnquiryScreen from "views/enquiry/EnquiryScreen";

const EnquiryViewModel = () => {
  const [currentScreen, setCurrentScreen] = useState<number>(1);
  const [searchresult, setsearchresult] = useState<UserEnquiryResponse>();
  const [issueSearchresult, setIssueSearchResult] = useState<IIssueEnquiry[]>();
  const selectedEnquiry = useSelector(
    (state: any) => state?.UIReducer?.enquiryType,
  );
  useEffect(() => {
    setCurrentScreen(selectedEnquiry);
  }, [selectedEnquiry]);
  const dispatch = useDispatch();
  const roleLocationDropDownList =
    store?.getState()?.masterData?.masterData?.data;
  const userEnquiryEnteredDetail = {
    name: useRef<string>(""),
    location: useRef<string>(""),
  };
  const issueEnquiryEnteredDetail = {
    customerCodeName: useRef<string>(""),
    location: useRef<string>(""),
  };

  const [NearByCustomerList, setNearByCustomerList] = useState<
    INearbyCustomer[] | undefined
  >();

  const issueEnquiry = async () => {
    dispatch(setLoaderVisibility(true));
    const body: IssueEnquiryBody = {
      issue_type: 0,
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
        setIssueSearchResult(res?.data?.data);
      }
    } catch (error) {}
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
        enableHighAccuracy: false,
        timeout: 10000,
      },
    );
  };

  useEffect(() => {
    nearbyCustomer();
  }, []);

  async function onSearch() {
    if (currentScreen == 1) {
      const body = {
        user_name: userEnquiryEnteredDetail.name.current,
        user_location: userEnquiryEnteredDetail.location.current,
      };
      const userRes: UserEnquiryResponse = await getUserEnquiry(body);
      setsearchresult(userRes);
    } else if (currentScreen == 2) {
      issueEnquiry();
    }
  }



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
      
      }}
    />
  );
};

export default EnquiryViewModel;
