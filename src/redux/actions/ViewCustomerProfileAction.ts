import { GET_CUSTOMER_LIST } from "redux/actionConstants";

export const getListReducer = (data: any, page: number) => {
    return {
      type: GET_CUSTOMER_LIST,
      payload: { data, page },
    };
  };