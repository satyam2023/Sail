import { AccompRoot } from "models/ApiResponses/IdropDown";
import { GET_ISSUE_LIST, SET_ACCOMPANYING, SET_REASON_CONTACT } from "redux/actionConstants";




export const saveAccompaying = (data: AccompRoot|undefined) => {
    return {
      type: SET_ACCOMPANYING,
      payload: data,
    };
  };

  export const saveReasonContact = (data: object|undefined) => {
    return {
      type: SET_REASON_CONTACT,
      payload: data,
    };
  };

  export const saveIssueList = (data: object|undefined) => {
    return {
      type: GET_ISSUE_LIST,
      payload: data,
    };
  };

