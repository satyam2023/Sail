import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { HomeResponse } from "models/ApiResponses/HomeResponse";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { MasterDataResponse } from "models/ApiResponses/MasterDataResponse";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import {
  getClusterData,
  getCustStatus,
  getCustType,
  getProcuredData,
  getSegmentReducer,
  getSupplierdData,
} from "redux/actions/CreateCustomerAction";
import {
  saveAccompaying,
  saveReasonContact,
} from "redux/actions/DropDownAction";
import { saveMasterData } from "redux/actions/MasterDataAction";
import { saveEscaltedData } from "redux/actions/MessageAction";
import {
  sendGetRequest,
  sendMultipleGetRequests,
} from "services/network/Network";

export async function setMasterData(dispatch: Dispatch<AnyAction>) {
  try {
    const res: IApiResponse<MasterDataResponse> =
      await sendGetRequest<MasterDataResponse>(APIConstants.MASTER_DATA);
    dispatch(saveMasterData(res.data));
    return res;
  } catch (error) {
    logger(error);
  } finally {
  }
}

export const fetchHomeData = async () => {
  try {
    const res: IApiResponse<HomeResponse> = await sendGetRequest<HomeResponse>(
      APIConstants.HOME,
    );

    return res;
  } catch (error) {
    logger(error);
  } finally {
  }
};

export const allDropDownListApiCall = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res = await sendMultipleGetRequests<[]>([
      APIConstants.GET_SEGMENT_DATA,
      APIConstants.GET_CUSTOMER_TYPE_DATA,
      APIConstants.GET_CUST_STATUS_DATA,
      APIConstants.GET_CLUSTER_DATA,
      APIConstants.GET_PROCURED_DATA,
      APIConstants.GET_SUPPLIER_DATA,
      APIConstants.REASON_CONTACT,
      APIConstants.ACCOMPANYING_EXECUTIVE,
      APIConstants.GET_ESCALTED_DROPDOWN_DATA,
    ]);

    res[0]?.data?.isSuccess && dispatch(getSegmentReducer(res[0]?.data));
    res[1]?.data?.isSuccess && dispatch(getCustType(res[1]?.data));
    res[2]?.data?.isSuccess && dispatch(getCustStatus(res[2]?.data));
    res[3]?.data?.isSuccess && dispatch(getClusterData(res[3]?.data));
    res[4]?.data?.isSuccess && dispatch(getProcuredData(res[4]?.data));
    res[5]?.data?.isSuccess && dispatch(getSupplierdData(res[5]?.data));
    res[6]?.data?.isSuccess && dispatch(saveReasonContact(res[6]?.data));
    res[7]?.data?.isSuccess && dispatch(saveAccompaying(res[7]?.data));
    res[8]?.data?.isSuccess && dispatch(saveEscaltedData(res[8]?.data));
  } catch (e) {
    logger(e, "Error in Parallel api calling of all dropDowns");
  }
};
