import APIConstants from "core/ApiConstants";
import { sendPostRequest } from "services/network/Network";
import { INearbyCustomerBody, INearbyCustomerResponse } from "models/ApiResponses/IEnquiryResponses";

export const getNearbyCustomer = async (body: INearbyCustomerBody) => {
  try {
    return await sendPostRequest<INearbyCustomerResponse>(
      APIConstants.NEAREST_CUSTOMER,
      body,
    );
  } catch (error) {}
};