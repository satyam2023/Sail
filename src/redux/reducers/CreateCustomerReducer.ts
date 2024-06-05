import {
  GET_CLUSTER_DATA,
  // GET_CUSTOMER_LIST,
  GET_CUSTOMER_TYPE_DATA,
  GET_CUST_STATUS_DATA,
  GET_PROCURED_DATA,
  GET_SEGMENT_DATA,
  GET_SUPPLIER_DATA,
  SET_CREATE_CUSTOMER,
} from "redux/actionConstants";



const INITIAL_STATE = {
  data: {},
  listData: [],
  segmentData: [],
  customerType: [],
  customerStatus: [],
  clusterData: [],
  procuredData: [],
  supplierData: [],
};

const customerReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case GET_SEGMENT_DATA: {
      return {
        ...state,
        segmentData: action.payload,
      };
    }
    case GET_CUSTOMER_TYPE_DATA: {
      return {
        ...state,
        customerType: action.payload,
      };
    }
    case GET_CUST_STATUS_DATA: {
      return {
        ...state,
        customerStatus: action.payload,
      };
    }
    case SET_CREATE_CUSTOMER:
      return {
        ...state,
        data: action.payload,
      };
    case GET_CLUSTER_DATA: {
      return {
        ...state,
        clusterData: action.payload,
      };
    }
    case GET_PROCURED_DATA: {
      return {
        ...state,
        procuredData: action.payload,
      };
    }
    case GET_SUPPLIER_DATA: {
      return {
        ...state,
        supplierData: action.payload,
      };
    }
    default:
      return state;
  }
};
export default customerReducer;
