import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { INearbyCustomerBody, INearbyCustomerResponse, IUserEnquiryBody, IssueEnquiryBody, IssueEnquiryResponse, UserEnquiryResponse } from "models/ApiResponses/IEnquiryResponses";

import { sendPostRequest } from "services/network/Network";

export const getUserEnquiry = async (body: IUserEnquiryBody) => {
  try {
    const res= await sendPostRequest<UserEnquiryResponse>(
      APIConstants.USER_ENQUIRY,
      body,
    );
    return res?.data?.data;
  } catch (error) {
      logger(error);
    
  }
  finally{

  }
};

export const getIssueEnquiry = async (body: IssueEnquiryBody) => {
  try {
    const res= await sendPostRequest<IssueEnquiryResponse>(
      APIConstants.ISSUE_ENQUIRY,
      body,
    );
    return res;
  } catch (error) {
    logger(error);
      

  }
  finally{

  }
};

export const getNearbyCustomer = async (body: INearbyCustomerBody) => {
  try {
    const res=await sendPostRequest<INearbyCustomerResponse>(
      APIConstants.NEAREST_CUSTOMER,
      body,
    );
    return res;
  } catch (error) {}
};