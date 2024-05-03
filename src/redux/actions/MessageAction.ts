
import {  SET_ESCALATED_DATA, SET_MESSAGE_DATA} from "redux/actionConstants";
import { EscalatedResponse, MessageResponse } from "models/ApiResponses/MessageResponse";
export const saveInboxData = (data: MessageResponse|undefined) => {
  return {
    type: SET_MESSAGE_DATA,
    payload: data,
  };
};

export const saveEscaltedData = (data: EscalatedResponse|undefined) => {
  return {
    type: SET_ESCALATED_DATA,
    payload: data,
  };
};






