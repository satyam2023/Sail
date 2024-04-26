
import {  SET_MESSAGE_DATA} from "redux/actionConstants";
import { MessageResponse } from "models/ApiResponses/MessageResponse";
export const saveInboxData = (data: MessageResponse|undefined) => {
  return {
    type: SET_MESSAGE_DATA,
    payload: data,
  };
};






