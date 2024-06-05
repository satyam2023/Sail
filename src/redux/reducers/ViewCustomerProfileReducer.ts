import { GET_CUSTOMER_LIST } from "redux/actionConstants";

const INITIAL_STATE = {
  customerListData: [],
};

const viewCustomerProfileReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GET_CUSTOMER_LIST: {
      const  {data}  = action.payload;
      return {
        ...state,
        customerListData: data?.data,
      };
    }
    default:
      return state;
  }
};

export default viewCustomerProfileReducer;
