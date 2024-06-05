import {
  COMPEITITOR_BUTTON_TYPE,
  CUSTOMER_INFO_TYPE_TAB,
  ENQUIRY_TYPE,
  MODAL_TYPE,
  PROFILE_BUTTON_TYPE,
  TAB_TYPE,
  VISIT_TYPE,
} from "../actionConstants";
import { IBaseReducerInterface } from "./IBaseReducerInterface";

interface IUIReducer {
  visitType: number;
  enquiryType: number;
  modalVisibility: boolean;
  CompetitorButtonStatus: boolean;
  CustomerProfileButton: boolean;
  CustomerInformationTab: number;
  isVisitFocusFirstTime: boolean;
  tabVisibiity: boolean;
}

type Action =
  | IBaseReducerInterface<number, typeof VISIT_TYPE>
  | IBaseReducerInterface<number, typeof ENQUIRY_TYPE>
  | IBaseReducerInterface<boolean, typeof MODAL_TYPE>
  | IBaseReducerInterface<boolean, typeof TAB_TYPE>
  | IBaseReducerInterface<boolean, typeof COMPEITITOR_BUTTON_TYPE>
  | IBaseReducerInterface<boolean, typeof PROFILE_BUTTON_TYPE>
  | IBaseReducerInterface<number, typeof CUSTOMER_INFO_TYPE_TAB>;

const INITIAL_STATE: IUIReducer = {
  visitType: 1,
  enquiryType: 1,
  modalVisibility: false,
  tabVisibiity: true,
  CompetitorButtonStatus: false,
  CustomerProfileButton: false,
  CustomerInformationTab: 1,
  isVisitFocusFirstTime: true,
};

const UIReducer = (state = INITIAL_STATE, action: Action): IUIReducer => {
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
    default:
      return state;
  }
};
export default UIReducer;
