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
import { ICustomerBody } from "models/interface/ICustomerInfo";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoaderVisibility } from "redux/actions/LoaderAction";
import CustomerInformationScreen from "views/customerInformation/CustomerInformationScreen";

const CustomerInformationViewModel = () => {
  const currentInformationTab = useSelector(
    (state: any) => state?.UIReducer?.CustomerInformationTab,
  );
  const [searchButtonStatus, setSeachButtonStatus] = useState<boolean>(false);
  const detailToBeSearch = useRef<string>("");
  const dispatch = useDispatch();
  const handleEnteredCode_Name = (text: string) => {
    detailToBeSearch.current = text;
    if (detailToBeSearch.current.length > 0) {
      setSeachButtonStatus(true);
    }

    if (searchButtonStatus && detailToBeSearch.current.length == 0)
      setSeachButtonStatus(false);
  };

  const handleCustomerInformationAPICalling = async () => {
    const isNumber: boolean = Regex.CONTACT.test(detailToBeSearch?.current);
    const body: ICustomerBody = {
      customer_code: isNumber ? detailToBeSearch?.current : null,
      customer_name: !isNumber ? detailToBeSearch?.current : null,
    };
    try {
      dispatch(setLoaderVisibility(true));
      let res;
      switch (currentInformationTab) {
        case 0:
          {
          res = await orderStatusAPI(body);
          if(res?.isSuccess){
              
          }
          }
          break;
        case 1:{
          res = await ddreportStatus(body);
          if(res?.isSuccess){
              
          }
        }
          break;
        case 2:
          {
          res = await mouStatusAPI(body);
          if(res?.isSuccess){
              
          }
        }
          break;
        case 3:
          {
          res = await outStandingStatus(body);
          if(res?.isSuccess){
              
          }
        }
          break;
        case 4:
          {
          res = await lastvisitedStatus(body);
        
          if(res?.isSuccess){
              
          }
        }
        break;
        case 5:
          res == await offTakeStatus(body);
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
    if (searchButtonStatus) handleCustomerInformationAPICalling();
  };

  function downloadReport(){

  }

  return (
    <CustomerInformationScreen
      {...{
        handleEnteredCode_Name,
        searchButtonStatus,
        onSearchButtonClick,
        currentInformationTab,
        downloadReport
      }}
    />
  );
};

export default CustomerInformationViewModel;
