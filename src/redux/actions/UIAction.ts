import {
  COMPEITITOR_BUTTON_TYPE,
  CUSTOMER_INFO_TYPE_TAB,
  ENQUIRY_TYPE,
  IS_VISIT_FOCUS_FIRST_TIME,
  MODAL_TYPE,
  PROFILE_BUTTON_TYPE,
  TAB_TYPE,
  VISIT_TYPE,
} from "redux/actionConstants";

export const VisitType = (data: any) => {
  return { type: VISIT_TYPE, payload: data };
};

export const EnquiryType = (data: number) => {
  return { type: ENQUIRY_TYPE, payload: data };
};

export const BottomModal = (data: boolean) => {
  return { type: MODAL_TYPE, payload: data };
};

export const BottomTabVisibility = (data: boolean) => {
  return { type: TAB_TYPE, payload: data };
};

export const setCompetitorButtonStatus = (data: boolean) => {
  return { type: COMPEITITOR_BUTTON_TYPE, payload: data };
};

export const setCustomerProfileButton = (data: boolean) => {
  return { type: PROFILE_BUTTON_TYPE, payload: data };
};

export const setCustomerInformationTab = (data: number) => {
  return { type: CUSTOMER_INFO_TYPE_TAB, payload: data };
};

export const setIsVisitFocusStatus = (data: boolean) => {
  return {
    type: IS_VISIT_FOCUS_FIRST_TIME,
    payload: data,
  };
};
