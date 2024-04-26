import { ICreateCustomerBody } from "models/ApiResponses/CreateCustomer";
import {
  GET_CLUSTER_DATA,
  GET_CUSTOMER_TYPE_DATA,
  GET_CUST_STATUS_DATA,
  GET_PROCURED_DATA,
  GET_SEGMENT_DATA,
  GET_SUPPLIER_DATA,
  SET_CREATE_CUSTOMER,
} from "redux/actionConstants";


export const getSegmentReducer = (data: any) => {
  return {
    type: GET_SEGMENT_DATA,
    payload: data?.data,
  };
};

export const getCustType = (data: any) => {
  return {
    type: GET_CUSTOMER_TYPE_DATA,
    payload: data?.data,
  };
};
export const getCustStatus = (data: any) => {
  return {
    type: GET_CUST_STATUS_DATA,
    payload: data?.data,
  };
};

export const getClusterData = (data: any) => {
  return {
    type: GET_CLUSTER_DATA,
    payload: data?.data,
  };
};

export const getProcuredData = (data: any) => {
  return {
    type: GET_PROCURED_DATA,
    payload: data?.data,
  };
};

export const getSupplierdData = (data: any) => {
  return {
    type: GET_SUPPLIER_DATA,
    payload: data?.data,
  };
};

export const saveCreateCustomerProfileData = (data: ICreateCustomerBody) => {
  return {
    type: SET_CREATE_CUSTOMER,
    payload: data,
  };
};
