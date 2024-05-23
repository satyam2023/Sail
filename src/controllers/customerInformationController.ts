import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import {
  ICustomerResponse,
  IDDCustomerResponse,
  ILCBG,
  IMOU,
  IOffTakeAPIResponse,
  IOrderStatus,
  OutStandingAPIResponse,
  
} from "models/ApiResponses/CustomerInfoResponse";
import { IApiResponse } from "models/ApiResponses/IApiResponse";
import { ICustomerBody } from "models/interface/ICustomerInfo";

import { sendPostRequest } from "services/network/Network";

export const mouStatusAPI = async (body: ICustomerBody) => {
  try {
    const res = await sendPostRequest<IMOU>(APIConstants.MOU_STATUS, body);
    return res;
  } catch (e) {
    logger("Error in Mou Status API");
  }
};

export const orderStatusAPI = async (body: ICustomerBody) => {
  try {
    return await sendPostRequest<IOrderStatus>(APIConstants.ORDER_STATUS, body);
  } catch (e) {
    logger("Error in Order Status API");
  }
};

export const ddreportStatus = async (body: ICustomerBody) => {
  try {
    return await sendPostRequest<IDDCustomerResponse>(
      APIConstants.DD_REPORT,
      body,
    );
  } catch (e) {
    logger("Error in DD Report API");
  }
};

export const outStandingStatus = async (body: ICustomerBody) => {
  try {
    return await sendPostRequest<OutStandingAPIResponse>(
      APIConstants.OUTSTANDING_REPORT,
      body,
    );
  } catch (e) {
    logger("Error in OutStanding Status API");
  }
};

export const lastvisitedStatus = async (body: ICustomerBody) => {
  try {
    return await sendPostRequest(APIConstants.LAST_VISIT_REPORT, body);
  } catch (e) {
    logger("Error in Last Visit API");
  }
};

export const offTakeStatus = async (
  body: ICustomerBody,
) => {
  return await sendPostRequest<IOffTakeAPIResponse>(
    APIConstants.OFF_TAKE_REPORT,
    body,
  );
};

export const lgbcStatus = async (
  body: ICustomerBody,
) => {
  return await sendPostRequest<ILCBG>( APIConstants.LGBC_REPORT, body);
};

export const qcStatus = async (
  body: ICustomerBody,
) => {
  return await sendPostRequest<ICustomerResponse>(
    APIConstants.QC_REPORT,
    body,
  );
};

