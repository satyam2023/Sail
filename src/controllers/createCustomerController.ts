import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { ICreateCustomerBody, ICustomerCluster, ICustomerSegment, ICustomerStatus, ICustomerType, IProcuredProduct, ISupplier } from "models/ApiResponses/CreateCustomer";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
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
import { sendGetRequest, sendPostMultipartRequest} from "services/network/Network";



export const getCustomerSegmenList = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res :IApiResponse<ICustomerSegment>= await sendGetRequest(APIConstants.GET_SEGMENT_DATA);
    dispatch(getSegmentReducer(res?.data));
  } catch (error) {
    logger(error);
  } finally {
  }
};

export const getCustomerType = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res:IApiResponse<ICustomerType> = await sendGetRequest(APIConstants.GET_CUSTOMER_TYPE_DATA);
    dispatch(getCustType(res?.data));
  } catch (error) {
    logger(error);
  } finally {
  }
};

export const getCustomerStatus = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res:IApiResponse<ICustomerStatus>  = await sendGetRequest(APIConstants.GET_CUST_STATUS_DATA);
    dispatch(getCustStatus(res?.data));
  } catch (error) {
    logger(error);
  } finally {
  }
};

export const getClusterAPI = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res:IApiResponse<ICustomerCluster>  = await sendGetRequest(APIConstants.GET_CLUSTER_DATA);
    dispatch(getClusterData(res?.data));
  } catch (error) {
    logger(error);
  } finally {
  }
};

export const getProcuredProductAPI = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res:IApiResponse<IProcuredProduct>  = await sendGetRequest(APIConstants.GET_PROCURED_DATA);
    dispatch(getProcuredData(res?.data));
  } catch (error) {
    logger(error);
  } finally {
  }
};

export const getSupplierAPI = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const res:IApiResponse<ISupplier>   = await sendGetRequest(APIConstants.GET_SUPPLIER_DATA);
    dispatch(getSupplierdData(res?.data));
  } catch (error) {
    logger(error);
  } finally {
  }
};


export const getCreateCustomerProfile = async (body: FormData) => {
  const res: IApiResponse<ICreateCustomerBody> =
    await sendPostMultipartRequest<ICreateCustomerBody>(
      APIConstants.CREATE_CUSTOMER,
      body,
    );
  return res;
};



