import {
  COMPEITITOR_BUTTON_TYPE,
  CUSTOMER_INFO_TYPE_TAB,
  ENQUIRY_TYPE,
  IS_VISIT_FOCUS_FIRST_TIME,
  MODAL_TYPE,
  PROFILE_BUTTON_TYPE,
  TAB_TYPE,
  VISIT_TYPE,
} from "../actionConstants";
import { IBaseReducerInterface } from "./IBaseReducerInterface";

const INITIAL_STATE = {
  visitType: 1,
  enquiryType: 1,
  modalVisibility: false,
  tabVisibiity: true,
  CompetitorButtonStatus: false,
  CustomerProfileButton: false,
  CustomerInformationTab: 1,
  isVisitFocusFirstTime:true,
};

interface IUIReducer {
  visitType: number;
  enquiryType: number;
  modalVisibility: boolean;
  CompetitorButtonStatus: boolean;
  CustomerProfileButton: boolean;
  CustomerInformationTab: number;
  isVisitFocusFirstTime:boolean
}

const UIReducer = (
  state = INITIAL_STATE,
  action: any,
) => {
  switch (action.type) {
    case VISIT_TYPE: {
      return {
        ...state,
        visitType: action.payload,
      };
    }
    case ENQUIRY_TYPE: {
      return {
        ...state,
        enquiryType: action.payload,
      };
    }
    case MODAL_TYPE: {
      return {
        ...state,
        modalVisibility: action.payload,
      };
    }
    case TAB_TYPE: {
      return {
        ...state,
        tabVisibiity: action.payload,
      };
    }
    case COMPEITITOR_BUTTON_TYPE: {
      return {
        ...state,
        CompetitorButtonStatus: action.payload,
      };
    }
    case PROFILE_BUTTON_TYPE: {
      return {
        ...state,
        CustomerProfileButton: action.payload,
      };
    }
    case CUSTOMER_INFO_TYPE_TAB: {
      return {
        ...state,
        CustomerInformationTab: action.payload,
      };
    }
    case IS_VISIT_FOCUS_FIRST_TIME:{
      return{
        ...state,
        isVisitFocusFirstTime:action.payload,
      }
    }
    default:
      return state;
  }
};
export default UIReducer;
