import { useFocusEffect } from "@react-navigation/native";
import {
  ddreportStatus,
  lastvisitedStatus,
  lgbcStatus,
  mouStatusAPI,
  offTakeStatus,
  orderStatusAPI,
  outStandingStatus,
  qcStatus,
} from "controllers/customerInformationController";
import { Regex } from "helper/ValidationRegex";
import { downloadFile, logger } from "helper/helperFunctions";
import { ICustomerBody } from "models/interface/ICustomerInfo";
import { InformationDetails } from "models/interface/ICustomerInformation";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import { BottomTabVisibility } from "redux/actions/UIAction";
import StringConstants from "shared/localization";
import CustomerInformationScreen from "views/customerInformation/CustomerInformationScreen";

const CustomerInformationViewModel = () => {
  useFocusEffect(() => {
    dispatch(BottomTabVisibility(false));
    return () => dispatch(BottomTabVisibility(true));
  });
  const [isSearchSuccessful, setSearchStatus] = useState<boolean>(false);
  const [searchButtonStatus, setSeachButtonStatus] = useState<boolean>(false);
  const [details, setDetails] = useState<InformationDetails>({
    salesOrder: null,
    ddReport: null,
    mou: null,
    outstanding: null,
    offTakeStatus: null,
  });
  const detailToBeSearch = useRef<string>("");
  const currentInformationTab = useSelector(
    (state: any) => state?.UIReducer?.CustomerInformationTab,
  );
  const dispatch = useDispatch();
  const handleEnteredCode_Name = (text: string) => {
    detailToBeSearch.current = text;
    if (detailToBeSearch.current.length > 0) {
      setSeachButtonStatus(true);
    }
    if (searchButtonStatus && detailToBeSearch.current.length == 0)
      setSeachButtonStatus(false);
  };

  const setDetailsToIntialState = () => {
    setDetails((prev: InformationDetails) => ({
      ...prev,
      salesOrder: null,
      ddReport: null,
      mou: null,
      outstanding: null,
      offTakeStatus: null,
    }));
  };

  const handleCustomerInformationAPICalling = async () => {
    const isNumber: boolean = Regex.CONTACT.test(detailToBeSearch?.current);
    const body: ICustomerBody = {
      customer_code: isNumber ? detailToBeSearch?.current : null,
      customer_name: !isNumber ? detailToBeSearch?.current : null,
    };
    try {
      dispatch(setLoaderVisibility(true));
      let res: any;
      switch (currentInformationTab) {
        case 0:
          {
            res = await orderStatusAPI(body);
            if (res?.isSuccess) {
              setSearchStatus(true);
              res?.data?.data?.data[0].message ==
              StringConstants.NO_DATA_FETCHED
                ? setDetailsToIntialState()
                : setDetails((prev: InformationDetails) => ({
                    ...prev,
                    salesOrder: res?.data?.data,
                  }));
            }
          }
          break;
        case 1:
          {
            res = await ddreportStatus(body);
            if (res?.isSuccess) {
              setSearchStatus(true);
              res?.data?.data?.data[0].message ==
              StringConstants.NO_DATA_FETCHED
                ? setDetailsToIntialState()
                : setDetails((prev: InformationDetails) => ({
                    ...prev,
                    ddReport: res?.data?.data,
                  }));
            }
          }
          break;
        case 2:
          {
            res = await mouStatusAPI(body);
            if (res?.isSuccess) {
              setSearchStatus(true);
              res?.data?.data?.data[0].message ==
              StringConstants.NO_DATA_FETCHED
                ? setDetailsToIntialState()
                : setDetails((prev: InformationDetails) => ({
                    ...prev,
                    mou: res?.data?.data,
                  }));
            }
          }
          break;
        case 3:
          {
            res = await outStandingStatus(body);
            if (res?.isSuccess) {
              setSearchStatus(true);
              res?.data?.data?.data[0].message ==
              StringConstants.NO_DATA_FETCHED
                ? setDetailsToIntialState()
                : setDetails((prev: InformationDetails) => ({
                    ...prev,
                    outstanding: res?.data?.data,
                  }));
            }
          }
          break;
        case 4:
          {
            res = await lastvisitedStatus(body);

            if (res?.isSuccess) {
            }
          }
          break;
        case 5:
          {
            res = await offTakeStatus(body);
            if (res?.isSuccess) {
              setSearchStatus(true);
              res?.data?.data?.data[0].message ==
              StringConstants.NO_DATA_FETCHED
                ? setDetailsToIntialState()
                : setDetails((prev: InformationDetails) => ({
                    ...prev,
                    offTakeStatus: res?.data?.data,
                  }));
            }
          }
          break;
        case 6:
          res = await lgbcStatus(body);
          break;
        case 7:
          res = await qcStatus(body);
          break;
        default:
          break;
      }
    } catch (e) {
    } finally {
      dispatch(setLoaderVisibility(false));
    }
  };

  const onSearchButtonClick = () => {
    !isSearchSuccessful && handleCustomerInformationAPICalling();
  };

  const toggelStatus = () => {
    setDetailsToIntialState();
    setSearchStatus(!isSearchSuccessful);
  };

  const downloadReport = (url: string) => {
    try {
      downloadFile(url);
    } catch (e) {
      logger(e, "Error in DownLoadung file");
    }
  };

  return (
    <CustomerInformationScreen
      {...{
        handleEnteredCode_Name,
        searchButtonStatus,
        onSearchButtonClick,
        currentInformationTab,
        isSearchSuccessful,
        toggelStatus,
        downloadReport,
        details,
      }}
    />
  );
};

export default CustomerInformationViewModel;
