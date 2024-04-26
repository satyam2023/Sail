import APIConstants from "core/ApiConstants";
import { logger } from "helper/helperFunctions";
import { getListReducer } from "redux/actions/ViewCustomerProfileAction";
import { sendGetRequest, sendPatchRequest, sendPostMultipartRequest, sendPostRequest } from "services/network/Network";
export const getcustomerlist = async (dispatch: any, page: number) => {
    const res = await sendGetRequest(
      `${APIConstants.GET_CUSTOMER_LIST}?page=${page}`,
    );
      dispatch(getListReducer(res?.data, page));
  };

  export const updateRepresentativeAPIHandler = async (body: any) => {
    try {
      const res = await sendPatchRequest(
        APIConstants.UPDATE_REPRESENTATIVE,
        body,
      );
      return res;
    } catch (error) {}
  };


  export const addCustomerRepresentativeAPI = async (body: FormData) => {
    try {
      const res = await sendPostMultipartRequest(
        APIConstants.ADD_REPRESENTATIVE_DATA,
        body,
      );
    return res;
      }
      catch(e){
        logger("Error in Add Customer API")
      }
  };


  export const updateCompetitorAPIHandler = async (body: any) => {
    try {
      const res = await sendPatchRequest(APIConstants.UPDATE_COMPATITOR, body);
      return res;
    } catch (error) {}
  };

  export const addCustomerCompetitorAPIHandler = async (body: any) => {
    try {
      const res = await sendPostRequest(APIConstants.ADD_COMPETITOR, body);
      return res;
    } catch (error) {}
  };


  export const UpdateCustomerCodeAPIHandler = async (body: any) => {
    try {
      const res = await sendPatchRequest(APIConstants.UPDATE_CUSTOMER_CODE, body);
      return res;
    } catch (error) {}
  };


export const updateCustomerDetailAPIHandler = async (body: any) => {
  try {
    const res = await sendPostMultipartRequest(
      APIConstants.UPDATE_CUSTOMER,
      body,
    );
    return res;
  } catch (error) {}
};


export const searchCustomerData= async (body: any) => {
  try {
    const res = await sendPostRequest(APIConstants.SEARCH_CUSTOMER, body);
    return res;
  } catch (error) {}
};



  