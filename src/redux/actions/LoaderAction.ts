import { INVALID_CREDENTIAL, PENDING_APPROVAL, SET_LOADER_VISIBLE } from "../actionConstants";

export const setLoaderVisibility = (isVisible: boolean) => {
  return {
    type: SET_LOADER_VISIBLE,
    payload: isVisible,
  };
};

export const setPendingApprovalPopUp= (isVisible: boolean) => {
  return {
    type: PENDING_APPROVAL,
    payload: isVisible,
  };
};

export const setInvalidCredentialsPopUp= (isVisible: boolean) => {
  return {
    type: INVALID_CREDENTIAL,
    payload: isVisible,
  };
};
